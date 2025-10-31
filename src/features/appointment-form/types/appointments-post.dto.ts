export interface AppointmentDtoPost {
 	serviceId: string;
	staffId: string | undefined;
	customer: Customer;
	startsAt: string;
	notes: string;
}

interface Customer {
 	name: string;
	email: string;
	phone: string;
}
