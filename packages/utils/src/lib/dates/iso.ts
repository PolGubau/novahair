export type ISODate =
	`${string}-${string}-${string}T${string}:${string}:${string}Z`;

export const isISODate = (value: string): value is ISODate => {
	const isoDateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/;
	return isoDateRegex.test(value);
};

export const toISODate = (date: Date): ISODate => {
	return date.toISOString() as ISODate;
};

export const parseISODate = (isoDate: ISODate): Date => {
	return new Date(isoDate);
};

export const formatISODate = (
	isoDate: ISODate,
	locale = "en-US",
	options?: Intl.DateTimeFormatOptions,
): string => {
	const date = parseISODate(isoDate);
	return date.toLocaleString(locale, options);
};

/**
 * Combines a date and a time string (HH:MM) into a single Date object.
 * @param date Date object representing the date.
 * @param time Time string in HH:MM format.
 * @returns An object containing the new Date and its ISODate representation.
 */
export const combineDateTime = (
	date: Date,
	time: string,
): {
	newDate: Date;
	iso: ISODate;
} => {
	const [hours, minutes] = time.split(":").map(Number);
	const newDate = new Date(date);
	newDate.setHours(hours, minutes, 0, 0);
	const iso = toISODate(newDate);
	return { newDate, iso };
};

export function getTime(
	isoDate: ISODate,
): [string, { hours: number; minutes: number }] {
	const date = parseISODate(isoDate);
	// Use UTC to match backend timezone (ISODate always ends in Z = UTC)
	const hours = date.getUTCHours();
	const minutes = date.getUTCMinutes();
	const label = `${hours.toString().padStart(2, "0")}:${minutes
		.toString()
		.padStart(2, "0")}`;
	return [label, { hours, minutes }];
}
