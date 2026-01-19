import { useState } from "react";

const dateFormatter = new Intl.DateTimeFormat("es-ES", {
	month: "long",
	year: "numeric",
});

export const useCalendarTimes = () => {
	/**
	 * Date to know which month and year to show in the calendar
	 */
	const [currentDate, setCurrentDate] = useState<Date>(new Date());

	const [selectedDay, setSelectedDay] = useState<Date | null>(null);

	function goNextMonth() {
		setCurrentDate(
			new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1),
		);
	}

	function goPreviousMonth() {
		setCurrentDate(
			new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1),
		);
	}

	function goToday() {
		setCurrentDate(new Date());
	}

	const month = currentDate.getMonth();
	const year = currentDate.getFullYear();

	const formattedDate = dateFormatter.format(currentDate);

	return {
		currentDate,
		month,
		year,
		selectedDay,
		setSelectedDay,
		goNextMonth,
		goPreviousMonth,
		goToday,
		formattedDate,
	};
};
