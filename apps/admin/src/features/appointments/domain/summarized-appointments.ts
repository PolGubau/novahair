export interface SummarizedAppointment {
	serviceId: string;
	staffId: string | undefined;
	customer: Customer;
	startsAt: string;
	notes?: string;
}

export interface Customer {
	name: string;
	email: string;
	phone: string;
}
