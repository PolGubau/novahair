import i18n from "@novahair/utils/i18n/setup";

type HourLinesProps = {
	hoursCount: number;
	startHour: number;
	pixelsPerMinute: number;
	isFirstDay: boolean;
};

export function HourLines({
	hoursCount,
	startHour,
	pixelsPerMinute,
	isFirstDay,
}: HourLinesProps) {
	return (
		<>
			{Array.from({ length: hoursCount }, (_, i) => {
				const hour = i + startHour;
				function formatHourLabel(hour: number, locale = "en-US") {
					const date = new Date();
					date.setHours(hour, 0, 0, 0);
					return new Intl.DateTimeFormat(locale, {
						hour: "numeric",
						hour12: false,
					}).format(date);
				}
				return (
					<div
						key={hour}
						className="absolute w-full border-t border-foreground/10"
						style={{ top: `${i * 60 * pixelsPerMinute}px` }}
					>
						{isFirstDay && (
							<span className="absolute -left-8 -top-2 text-xs text-muted-foreground">
								{formatHourLabel(hour, i18n.language)}
							</span>
						)}
					</div>
				);
			})}
		</>
	);
}
