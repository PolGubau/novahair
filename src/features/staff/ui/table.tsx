import type { ColumnDef } from "@tanstack/react-table";
import { t } from "i18next";
import { Edit2, Trash } from "lucide-react";
import { Button } from "~/shared/ui/button";
import { Checkbox } from "~/shared/ui/checkbox";
import { DataTable } from "~/shared/ui/data-table";
import { IconButton } from "~/shared/ui/icon-button";
import { LoadingOverlay } from "~/shared/ui/loading-overlay";
import type { Staff } from "../domain/staff";

export const getColumns = (options?: {
	onEdit?: (s: Staff) => void;
	onDelete?: (s: Staff) => void;
}): ColumnDef<Staff>[] => {
	const { onEdit, onDelete } = options || {};

	const columns: ColumnDef<Staff>[] = [
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
			header: () => {
				return <span>{t("name")}</span>;
			},
			cell: ({ row }) => <div>{row.getValue("name")}</div>,
		},

		{
			accessorKey: "email",
			header: () => {
				return <span>{t("email")}</span>;
			},
			cell: ({ row }) => <div>{row.getValue("email")}</div>,
		},

		{
			accessorKey: "phone",
			header: () => {
				return <span>{t("phone")}</span>;
			},
			cell: ({ row }) => <div>{row.getValue("phone")}</div>,
		},
		{
			accessorKey: "color",
			header: () => {
				return <span>{t("color")}</span>;
			},
			cell: ({ row }) => (
				<div className="flex items-center gap-2">
					<span
						className="size-5 aspect-square rounded-full border border-foreground/20"
						style={{
							backgroundColor: row.getValue("color"),
						}}
					/>
				</div>
			),
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

export const StaffTable = ({
	staffs,
	isLoading,
	onEdit,
	onDelete,
}: {
	staffs: Staff[];
	isLoading: boolean;
	onEdit?: (s: Staff) => void;
	onDelete?: (s: Staff) => void;
}) => {
	const cols = getColumns({ onEdit, onDelete });
	return (
		<LoadingOverlay isLoading={isLoading}>
			<DataTable data={staffs} columns={cols} />
		</LoadingOverlay>
	);
};
