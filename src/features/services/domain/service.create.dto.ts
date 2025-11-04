export interface ServiceCreateDTO {
	tenantId: string;
	name: string;
	description: string;
	durationMin: number;
	priceCents: number;
	bufferBefore: number;
	bufferAfter: number;
	active: boolean;
}

export interface EditableServiceCreateDTO
	extends Pick<
		ServiceCreateDTO,
		| "name"
		| "description"
		| "durationMin"
		| "priceCents"
		| "bufferBefore"
		| "bufferAfter"
	> {}
