import { Appointment } from "@novahair/client";
import { PhoneCell, StaffChip } from "@novahair/ui";
import { DataTable } from "@novahair/ui/data-table/data-table";
import { ErrorBoundary } from "@novahair/ui/error-boundary";
import { LoadingOverlay } from "@novahair/ui/loading-overlay";
import { createColumnHelper } from "@tanstack/react-table";
import { useTranslation } from "react-i18next";

function formatDate(dateString: string) {
	const formatOptions: Intl.DateTimeFormatOptions = {
		day: "2-digit",
		month: "2-digit",
		year: "numeric",
	};
	const date = new Date(dateString);
	return date.toLocaleString(undefined, formatOptions);
}

function formatTime(dateString: string) {
	const formatOptions: Intl.DateTimeFormatOptions = {
		hour: "2-digit",
		minute: "2-digit",
	};
	const date = new Date(dateString);
	return date.toLocaleString(undefined, formatOptions);
}


const columnHelper = createColumnHelper<Appointment>();

export const AppointmentTable = ({
	appointments,
	isLoading,
}: {
	appointments: Appointment[];
	isLoading: boolean;
}) => {
	const { t } = useTranslation();
	const columns = [
		columnHelper.accessor("startAt", {
			cell: (info) => formatDate(info.getValue()),
			header: () => <span>{t("date")}</span>,
			id: "date",
			meta: {
				filterVariant: "date",
			},
		}),
		columnHelper.accessor("startAt", {
			cell: (info) => formatTime(info.getValue()),
			header: () => <span>{t("time")}</span>,
			id: "time",
			meta: {
				filterVariant: "date",
			},
		}),

		columnHelper.accessor("customer.name", {
			cell: (info) => info.getValue(),
			header: () => <span>{t("customer_name")}</span>,
			id: "customerName",
		}),
 
		columnHelper.accessor("customer.phone", {
			cell: ({ row }) => <PhoneCell phone={row.original.customer.phone} />,
			header: () => <span>{t("customer_phone")}</span>,
			id: "customerPhone",
		}),
		columnHelper.accessor("staff.name", {
			cell: (info) => (
				<StaffChip
					avatarUrl={info.row.original.staff.avatarUrl}
					name={info.getValue()}
				/>
			),
			header: () => <span>{t("staff_name")}</span>,
			id: "staffName",
		}),
		columnHelper.accessor("service.name", {
			cell: (info) => info.getValue(),
			header: () => <span>{t("service")}</span>,
			id: "serviceName",
		}),
	];

	return (
		<ErrorBoundary>
			<LoadingOverlay isLoading={isLoading}>
				<DataTable columns={columns} data={appointments} />
			</LoadingOverlay>
		</ErrorBoundary>
	);
};
