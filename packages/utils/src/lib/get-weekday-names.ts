export type WeekdayName = {
	long: string;
	short: string;
};

/**
 * Devuelve los nombres de los días de la semana en ambos formatos (long/short)
 * según el locale dado.
 */
export const getWeekdayNames = (locale = "es-ES"): WeekdayName[] => {
	const longFmt = new Intl.DateTimeFormat(locale, { weekday: "long" });
	const shortFmt = new Intl.DateTimeFormat(locale, { weekday: "short" });

	const referenceMonday = new Date(Date.UTC(2025, 0, 6)); // lunes fijo (6 jan 2025)
	const days = Array.from({ length: 7 }, (_, i) => {
		const day = new Date(referenceMonday);
		day.setUTCDate(referenceMonday.getUTCDate() + i);
		return { long: longFmt.format(day), short: shortFmt.format(day) };
	});

	return days;
};
