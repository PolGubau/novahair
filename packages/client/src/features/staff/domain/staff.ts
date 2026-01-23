import type { Service } from "../../services";

export interface Staff {
	id: string;
	tenantId: string;
	name: string;
	avatarUrl: string | null;
	email: string;
	phone: string;
	color: string;
	services: Service[];
}

export type StaffCreateDto = Pick<
	Staff,
	"name" | "email" | "phone" | "color" | "tenantId" | "avatarUrl"
>;
export type StaffCreate = Pick<
	Staff,
	"name" | "email" | "phone" | "color" | "avatarUrl"
>;
