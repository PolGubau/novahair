import type { Service } from "@novahair/client";
import { Avatar, AvatarFallback, AvatarImage } from "@novahair/ui/avatar";
import { Button } from "@novahair/ui/button";
import { Checkbox } from "@novahair/ui/checkbox/checkbox";
import { DataTable } from "@novahair/ui/data-table";
import { IconButton } from "@novahair/ui/icon-button";
import { LoadingOverlay } from "@novahair/ui/loading-overlay";
import i18n from "@novahair/utils/i18n/setup";
import type { ColumnDef } from "@tanstack/react-table";
import { t } from "i18next";
import { ArrowUpDown, Edit2, Trash } from "lucide-react";

export const getColumns = (options?: {
	onEdit?: (s: Service) => void;
	onDelete?: (s: Service) => void;
}): ColumnDef<Service>[] => {
	const { onEdit, onDelete } = options || {};

	const columns: ColumnDef<Service>[] = [
		{
			id: "select",
			header: ({ table }) => (
				<Checkbox
					checked={
						table.getIsAllPageRowsSelected() ||
						(table.getIsSomePageRowsSelected() && "indeterminate")
					}
					onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
					aria-label="Select all"
				/>
			),
			cell: ({ row }) => (
				<Checkbox
					checked={row.getIsSelected()}
					onCheckedChange={(value) => row.toggleSelected(!!value)}
					aria-label="Select row"
				/>
			),
			enableSorting: false,
			enableHiding: false,
		},

		{
			accessorKey: "name",
			header: ({ column }) => {
				return (
					<Button
						variant="ghost"
						onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					>
						{t("name")}
						<ArrowUpDown />
					</Button>
				);
			},
			cell: ({ row }) => (
				<div className="lowercase">{row.getValue("name")}</div>
			),
		},

		{
			accessorKey: "description",
			header: () => {
				return <span>{t("description")}</span>;
			},
			cell: ({ row }) => (
				<div className="lowercase">{row.getValue("description")}</div>
			),
		},

		{
			accessorKey: "imageUrl",
			header: () => {
				return <span>{t("image")}</span>;
			},
			cell: ({ row }) => (
				<div>
					<Avatar className="rounded-md">
						<AvatarImage
							src={row.getValue("imageUrl")}
							alt={row.getValue("name")}
						/>
						<AvatarFallback>
							{JSON.stringify(row.getValue("name")).charAt(1).toUpperCase()}
						</AvatarFallback>
					</Avatar>
				</div>
			),
		},

		{
			accessorKey: "priceCents",
			header: () => {
				return <span>{t("price")}</span>;
			},
			cell: ({ row }) => {
				const format = new Intl.NumberFormat(i18n.language, {
					style: "currency",
					currency: "EUR",
				});
				const priceInCents = row.getValue("priceCents") as number;
				const priceInEuros = priceInCents / 100;
				const formattedPrice = format.format(priceInEuros);

				return <div className="lowercase">{formattedPrice}</div>;
			},
		},

		{
			id: "actions",
			enableHiding: false,
			cell: ({ row }) => {
				const service = row.original;

				return (
					<div className="flex items-center justify-end gap-2">
						<Button variant="ghost" size="sm" onClick={() => onEdit?.(service)}>
							<Edit2 />
							{t("edit")}
						</Button>
						<IconButton
							variant="error"
							label={t("delete")}
							size="sm"
							onClick={() => {
								if (
									window.confirm(
										`¿Estás seguro que quieres borrar el servicio "${service.name}"?`,
									)
								) {
									onDelete?.(service);
								}
							}}
						>
							<Trash />
						</IconButton>
					</div>
				);
			},
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
	const cols = getColumns({ onEdit, onDelete });
	return (
		<LoadingOverlay isLoading={isLoading}>
			<DataTable data={services} columns={cols} />
		</LoadingOverlay>
	);
};
