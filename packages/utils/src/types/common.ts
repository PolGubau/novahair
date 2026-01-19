export type Breakpoints = "xs" | "sm" | "md" | "lg" | "xl";

// This type should be redeclared in each app based on their routeTree
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
