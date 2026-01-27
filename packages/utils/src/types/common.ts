export const sizes = {
	xs: "xs",
	sm: "sm",
	md: "md",
	lg: "lg",
	xl: "xl",
} as const;

export type Sizes = typeof sizes[keyof typeof sizes];

export type ExistingRoute = string;

export type AbstractRepository<
	T,
	CreateDTO = T,
	UpdateDTO = Partial<CreateDTO>,
> = {
	list: () => Promise<T[]>;
	get: (id: string) => Promise<T | null>;
	create: (payload: CreateDTO) => Promise<T>;
	update: (id: string, payload: UpdateDTO) => Promise<T>;
	delete: (id: string) => Promise<void>;
};
 