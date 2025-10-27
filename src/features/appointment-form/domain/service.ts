export interface Service {
	id: string;
	tenantId: string;
	name: string;
	durationMin: number;
	priceCents: number;
	bufferBefore: number;
	bufferAfter: number;
	active: boolean;
}
