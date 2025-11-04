export interface Service {
	id: string;
	tenantId: string;
	name: string;
	description: string | null;
	imageUrl: null | string;
	durationMin: number;
	priceCents: number;
	bufferBefore: number;
	bufferAfter: number;
	active: boolean;
}
