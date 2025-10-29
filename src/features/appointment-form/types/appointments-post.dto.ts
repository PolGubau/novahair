export interface AppointmentDtoPost {
	tenantId: string;
	serviceId: string;
	staffId: string;
	customer: Customer;
	startsAt: string;
	endsAt: string;
	priceCents: number;
	notes: string;
}

interface Customer {
	tenantId: string;
	name: string;
	email: string;
	phone: string;
	notes: string;
}
