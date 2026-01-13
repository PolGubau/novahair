export interface Staff {
	id: string;
	tenantId: string;
	name: string;
	avatarUrl?: string;
	email: string;
	phone: string;
	color: string;
}

export type StaffCreateDto = Pick<
	Staff,
	"name" | "email" | "phone" | "color" | "tenantId" | "avatarUrl"
> & {
	active: boolean;
};
export type StaffCreate = Pick<Staff, "name" | "email" | "phone" | "color" | "avatarUrl">;