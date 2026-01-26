import { PhoneCell, StaffChip } from "@novahair/ui";
import { DataTable } from "@novahair/ui/data-table/data-table";
import { ErrorBoundary } from "@novahair/ui/error-boundary";
import { LoadingOverlay } from "@novahair/ui/loading-overlay";
import { createColumnHelper } from "@tanstack/react-table";
import { t } from "i18next";
import type { Appointment } from "../domain/appointment";

function formatDate(dateString: string) {
	const formatOptions: Intl.DateTimeFormatOptions = {
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
	};
	const date = new Date(dateString);
	return date.toLocaleString(undefined, formatOptions);
}

const columnHelper = createColumnHelper<Appointment>();
const columns = [
	columnHelper.accessor("startsAt", {
		id: "startsAt",
		meta: {
			filterVariant: "date",
		},
		cell: (info) => formatDate(info.getValue()),
		header: () => <span>{t("date")}</span>,
	}),
	columnHelper.accessor("service.name", {
		id: "serviceName",
		cell: (info) => info.getValue(),
		header: () => <span>{t("service")}</span>,
	}),
	columnHelper.accessor("staff.name", {
		id: "staffName",
		cell: (info) => (
			<StaffChip
				name={info.getValue()}
				avatarUrl={info.row.original.staff.avatarUrl}
			/>
		),
		header: () => <span>{t("name")}</span>,
	}),
	columnHelper.accessor("customer.name", {
		id: "customerName",
		cell: (info) => info.getValue(),
		header: () => <span>{t("name")}</span>,
	}),
	columnHelper.accessor("customer.email", {
		id: "customerEmail",
		cell: (info) => info.getValue(),
		header: () => <span>{t("email")}</span>,
	}),
	columnHelper.accessor("customer.phone", {
		id: "customerPhone",
		cell: ({ row }) => <PhoneCell phone={row.original.customer.phone} />,
		header: () => <span>{t("phone")}</span>,
	}),
];

export const AppointmentTable = ({
	appointments,
	isLoading,
}: {
	appointments: Appointment[];
	isLoading: boolean;
}) => {
	return (
		<ErrorBoundary>
			<LoadingOverlay isLoading={isLoading}>
				<DataTable data={appointments} columns={columns} />
			</LoadingOverlay>
		</ErrorBoundary>
	);
};
