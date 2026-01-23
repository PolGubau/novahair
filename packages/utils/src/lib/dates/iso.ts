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
