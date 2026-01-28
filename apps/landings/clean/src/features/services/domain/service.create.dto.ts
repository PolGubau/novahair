export interface ServiceCreateDTO {
	tenantId: string;
	name: string;
	description: string;
	durationMin: number;
	imageUrl: string;
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
		| "imageUrl"
		| "priceCents"
		| "bufferBefore"
		| "bufferAfter"
	> {}
