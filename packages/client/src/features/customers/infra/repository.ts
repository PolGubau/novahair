import { buildApiUrl, genericFetch } from "@novahair/utils";
import { toCustomer } from "../../..";
import type {
	CreateCustomerDto,
	CustomerDto,
	UpdateCustomerDto,
} from "../../../types";
import type { Customer } from "../domain/customer";

export type CustomersRepository = {
	list: (tenantId: string) => Promise<Customer[]>;
	get: (tenantId: string, id: string) => Promise<Customer>;
	create: (tenantId: string, data: CreateCustomerDto) => Promise<Customer>;
	update: (
		tenantId: string,
		id: string,
		data: UpdateCustomerDto,
	) => Promise<Customer>;
	delete: (tenantId: string, id: string) => Promise<void>;
};

export const customersRepository: CustomersRepository = {
	list: async (tenantId) => {
		const dto = await genericFetch<CustomerDto[]>(
			buildApiUrl(`tenants/${tenantId}/customers`),
		);
		return dto.map(toCustomer);
	},

	get: async (tenantId, id) => {
		const dto = await genericFetch<CustomerDto>(
			buildApiUrl(`tenants/${tenantId}/customers/${id}`),
		);
		return toCustomer(dto);
	},

	create: async (tenantId, data) => {
		const dto = await genericFetch<CustomerDto>(
			buildApiUrl(`tenants/${tenantId}/customers`),
			{
				method: "POST",
				body: JSON.stringify(data),
			},
		);
		return toCustomer(dto);
	},

	update: async (tenantId, id, data) => {
		const dto = await genericFetch<CustomerDto>(
			buildApiUrl(`tenants/${tenantId}/customers/${id}`),
			{
				method: "PUT",
				body: JSON.stringify(data),
			},
		);
		return toCustomer(dto);
	},

	delete: async (tenantId, id) => {
		await genericFetch(buildApiUrl(`tenants/${tenantId}/customers/${id}`), {
			method: "DELETE",
		});
	},
};
