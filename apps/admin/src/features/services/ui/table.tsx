import type { Service } from "@novahair/client";
import { Avatar } from "@novahair/ui/avatar";
import { Button } from "@novahair/ui/button";
import { Checkbox } from "@novahair/ui/checkbox/checkbox";
import { DataTable } from "@novahair/ui/data-table/data-table";
import { ErrorBoundary } from "@novahair/ui/error-boundary";
import { IconButton } from "@novahair/ui/icon-button";
import { LoadingOverlay } from "@novahair/ui/loading-overlay";
import { sizes } from "@novahair/utils";
import i18n from "@novahair/utils/i18n/setup";
import type { ColumnDef } from "@tanstack/react-table";
import { t } from "i18next";
import { ArrowUpDown, Edit2, Trash } from "lucide-react";
import { useTranslation } from "react-i18next";

export const getColumns = (
 	options?: {
		onEdit?: (s: Service) => void;
		onDelete?: (s: Service) => void;
	},
): ColumnDef<Service>[] => {
	const { onEdit, onDelete } = options || {};

	const columns: ColumnDef<Service>[] = [
		{
			cell: ({ row }) => (
				<Checkbox
					aria-label="Select row"
					checked={row.getIsSelected()}
					onCheckedChange={(value) => row.toggleSelected(!!value)}
				/>
			),
			enableHiding: false,
			enableSorting: false,
			header: ({ table }) => (
				<Checkbox
					aria-label="Select all"
					checked={
						table.getIsAllPageRowsSelected() ||
						(table.getIsSomePageRowsSelected() && "indeterminate")
					}
					onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				/>
			),
			id: "select",
		},

		{
			accessorKey: "name",
			cell: ({ row }) => (
				<div className="items-center flex gap-2">
					<Avatar
						alt={row.getValue("name")}
						src={row.original.imageUrl ?? ""}
					/>

					{row.getValue("name")}
				</div>
			),
			header: ({ column }) => {
				return (
					<Button
						onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
						variant="ghost"
					>
						{t("name")}
						<ArrowUpDown />
					</Button>
				);
			},
		},

		{
			accessorKey: "description",
			cell: ({ row }) => (
				<div className="lowercase">{row.getValue("description")}</div>
			),
			header: () => {
				return <span>{t("description")}</span>;
			},
		},

		{
			accessorKey: "priceCents",
			cell: ({ row }) => {
				const format = new Intl.NumberFormat(i18n.language, {
					currency: "EUR",
					style: "currency",
				});
				const priceInCents = row.getValue("priceCents") as number;
				const priceInEuros = priceInCents / 100;
				const formattedPrice = format.format(priceInEuros);

				return <div className="lowercase">{formattedPrice}</div>;
			},
			header: () => {
				return <span>{t("price")}</span>;
			},
		},

		{
			cell: ({ row }) => {
				const service = row.original;

				return (
					<div className="flex items-center justify-end gap-2">
						<Button
							onClick={() => onEdit?.(service)}
							size={sizes.sm}
							variant="ghost"
						>
							<Edit2 />
							{t("edit")}
						</Button>
						<IconButton
							label={t("delete")}
							onClick={() => {
								if (
									window.confirm(
										`¿Estás seguro que quieres borrar el servicio "${service.name}"?`,
									)
								) {
									onDelete?.(service);
								}
							}}
							size={sizes.sm}
							variant="error"
						>
							<Trash />
						</IconButton>
					</div>
				);
			},
			enableHiding: false,
			id: "actions",
		},
	];

	return columns;
};

export const ServiceTable = ({
	services,
	isLoading,
	onEdit,
	onDelete,
}: {
	services: Service[];
	isLoading: boolean;
	onEdit?: (s: Service) => void;
	onDelete?: (s: Service) => void;
}) => {
	const cols = getColumns({ onDelete, onEdit });
	return (
		<ErrorBoundary>
			<LoadingOverlay isLoading={isLoading}>
				<DataTable columns={cols} data={services} />
			</LoadingOverlay>
		</ErrorBoundary>
	);
};
