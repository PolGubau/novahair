import { useScheduleActions } from "@novahair/client";
import { config } from "@novahair/utils";
import { useCallback, useRef, useState } from "react";
import type { Schedule } from "../weekly-calendar";

type ResizeHandle = "top" | "bottom" | null;

export function useScheduleResize(
	schedule: Schedule,
	pixelsPerMinute: number,
	startHour: number,
	onSuccess?: () => void,
) {
	const [isResizing, setIsResizing] = useState(false);
	const [resizeHandle, setResizeHandle] = useState<ResizeHandle>(null);
	const [tempHeight, setTempHeight] = useState<number | null>(null);
	const [tempTop, setTempTop] = useState<number | null>(null);
	const [previewTime, setPreviewTime] = useState<string | null>(null);

	// Store initial values when starting resize
	const initialValuesRef = useRef<{
		startMinutes: number;
		endMinutes: number;
		top: number;
		height: number;
	} | null>(null);

	const { update } = useScheduleActions(config.tenantId);
	const { mutate, isPending } = update;

	const handleMouseDown = useCallback(
		(e: React.MouseEvent, handle: "top" | "bottom") => {
			e.stopPropagation();

			// Store initial values
			const startDate = new Date(schedule.start);
			const endDate = new Date(schedule.end);
			const startMinutes = startDate.getUTCHours() * 60 + startDate.getUTCMinutes();
			const endMinutes = endDate.getUTCHours() * 60 + endDate.getUTCMinutes();
			const adjustedStart = startMinutes - startHour * 60;
			const adjustedEnd = endMinutes - startHour * 60;

			initialValuesRef.current = {
				startMinutes,
				endMinutes,
				top: Math.max(0, adjustedStart) * pixelsPerMinute,
				height: Math.max(20, (adjustedEnd - adjustedStart) * pixelsPerMinute),
			};

			setIsResizing(true);
			setResizeHandle(handle);
		},
		[schedule, pixelsPerMinute, startHour],
	);

	const handleMouseMove = useCallback(
		(e: MouseEvent) => {
			if (!isResizing || !resizeHandle || !initialValuesRef.current) return;

			const startDate = new Date(schedule.start);
			const endDate = new Date(schedule.end);
			const startMinutes =
				startDate.getUTCHours() * 60 + startDate.getUTCMinutes();
			const endMinutes = endDate.getUTCHours() * 60 + endDate.getUTCMinutes();

			// Get the calendar container to calculate relative position
			const calendarContainer = (e.target as HTMLElement).closest(
				"[data-calendar-day]",
			);
			if (!calendarContainer) return;

			const rect = calendarContainer.getBoundingClientRect();
			const relativeY = e.clientY - rect.top;
			const minutesFromStart = relativeY / pixelsPerMinute;
			const totalMinutes = minutesFromStart + startHour * 60;

			// Round to 15-minute intervals
			const roundedMinutes = Math.round(totalMinutes / 15) * 15;

			// Helper to format time
			const formatTime = (minutes: number) => {
				const hours = Math.floor(minutes / 60);
				const mins = minutes % 60;
				return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
			};

			if (resizeHandle === "top") {
				// Resizing from top - change start time
				const newStartMinutes = Math.max(0, Math.min(roundedMinutes, endMinutes - 15));
				const adjustedStart = newStartMinutes - startHour * 60;
				const adjustedEnd = endMinutes - startHour * 60;

				setTempTop(Math.max(0, adjustedStart) * pixelsPerMinute);
				setTempHeight(Math.max(20, (adjustedEnd - adjustedStart) * pixelsPerMinute));
				setPreviewTime(formatTime(newStartMinutes));
			} else {
				// Resizing from bottom - change end time
				const newEndMinutes = Math.max(startMinutes + 15, roundedMinutes);
				const adjustedStart = startMinutes - startHour * 60;
				const adjustedEnd = newEndMinutes - startHour * 60;

				setTempHeight(Math.max(20, (adjustedEnd - adjustedStart) * pixelsPerMinute));
				setPreviewTime(formatTime(newEndMinutes));
			}
		},
		[isResizing, resizeHandle, schedule, pixelsPerMinute, startHour],
	);

	const handleMouseUp = useCallback(() => {
		if (!isResizing || !resizeHandle || !initialValuesRef.current) {
			setIsResizing(false);
			setResizeHandle(null);
			setTempHeight(null);
			setTempTop(null);
			setPreviewTime(null);
			return;
		}

		const startDate = new Date(schedule.start);
		const endDate = new Date(schedule.end);

		// Calculate new times based on temp values
		let newStartTime = schedule.start;
		let newEndTime = schedule.end;

		if (resizeHandle === "top" && tempTop !== null) {
			// Calculate new start time from tempTop
			const newStartMinutes = (tempTop / pixelsPerMinute) + (startHour * 60);
			const hours = Math.floor(newStartMinutes / 60);
			const minutes = Math.round(newStartMinutes % 60);

			// Create new date in UTC, preserving the original date
			const newStart = new Date(Date.UTC(
				startDate.getUTCFullYear(),
				startDate.getUTCMonth(),
				startDate.getUTCDate(),
				hours,
				minutes,
				0,
				0
			));
			newStartTime = newStart.toISOString() as any;
		} else if (resizeHandle === "bottom" && tempHeight !== null) {
			// Calculate new end time from tempHeight
			const newDurationMinutes = tempHeight / pixelsPerMinute;
			const startMinutes = initialValuesRef.current.startMinutes;
			const newEndMinutes = startMinutes + newDurationMinutes;
			const hours = Math.floor(newEndMinutes / 60);
			const minutes = Math.round(newEndMinutes % 60);

			// Create new date in UTC, preserving the original date
			const newEnd = new Date(Date.UTC(
				endDate.getUTCFullYear(),
				endDate.getUTCMonth(),
				endDate.getUTCDate(),
				hours,
				minutes,
				0,
				0
			));
			newEndTime = newEnd.toISOString() as any;
		}

		// Update schedule
		mutate(
			{
				staffId: schedule.staff.id,
				data: [
					{
						id: schedule.id,
						startTime: newStartTime,
						endTime: newEndTime,
					},
				],
			},
			{
				onSuccess: () => {
					onSuccess?.();
					setIsResizing(false);
					setResizeHandle(null);
					setTempHeight(null);
					setTempTop(null);
					setPreviewTime(null);
				},
			},
		);
	}, [isResizing, resizeHandle, tempHeight, tempTop, schedule, pixelsPerMinute, startHour, mutate, onSuccess]);

	return {
		isResizing,
		resizeHandle,
		tempHeight,
		tempTop,
		isPending,
		handleMouseDown,
		handleMouseMove,
		handleMouseUp,
		previewTime,
	};
}

