import type { Staff } from "@novahair/client";
import { Checkbox, LabelWithCopy, PhoneCell } from "@novahair/ui";
import { Avatar } from "@novahair/ui/avatar";
import { Button } from "@novahair/ui/button";
import { DataTable } from "@novahair/ui/data-table/data-table";
import { ErrorBoundary } from "@novahair/ui/error-boundary";
import { IconButton } from "@novahair/ui/icon-button";
import { LoadingOverlay } from "@novahair/ui/loading-overlay";
import type { ColumnDef } from "@tanstack/react-table";
import { Edit2, Trash } from "lucide-react";
import { useTranslation } from "react-i18next";
import { ServicesAssignedCell } from "./services-assigned-cell";

export const getColumns = (
	t: (key: string) => string,
	options?: {
		onEdit?: (s: Staff) => void;
		onDelete?: (s: Staff) => void;
	},
): ColumnDef<Staff>[] => {
	const { onEdit, onDelete } = options || {};

	const columns: ColumnDef<Staff>[] = [
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
				<div className="flex gap-2 items-center">
					<Avatar alt={t("image_url")} src={row.original.avatarUrl ?? ""} />
					{row.getValue("name")}
				</div>
			),
			header: () => {
				return <span>{t("name")}</span>;
			},
		},

		{
			accessorKey: "email",
			cell: ({ row }) => <LabelWithCopy label={row.getValue("email")} />,
			header: () => {
				return <span>{t("email")}</span>;
			},
		},

		{
			accessorKey: "phone",
			cell: ({ row }) => <PhoneCell phone={row.getValue("phone")} />,
			header: () => {
				return <span>{t("phone")}</span>;
			},
		},
		{
			accessorKey: "color",
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
			header: () => {
				return <span>{t("color")}</span>;
			},
		},
		{
			accessorKey: "services",
			cell: ({ row }) => {
				const services = row.getValue("services") as Staff["services"];
				return (
					<ServicesAssignedCell
						assignedServiceIds={services.map((s) => s.id)}
						staffId={row.original.id}
					/>
				);
			},
			header: () => {
				return <span>{t("services")}</span>;
			},
			meta: {
				filterVariant: "null",
			},
		},

		{
			cell: ({ row }) => {
				const staff = row.original;

				return (
					<div className="flex items-center justify-end gap-2">
						<Button onClick={() => onEdit?.(staff)} size="sm" variant="ghost">
							<Edit2 />
							{t("edit")}
						</Button>
						<IconButton
							label={t("delete")}
							onClick={() => {
								if (
									window.confirm(
										`¿Estás seguro que quieres borrar el staff "${staff.name}"?`,
									)
								) {
									onDelete?.(staff);
								}
							}}
							size="sm"
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
	const { t } = useTranslation();
	const cols = getColumns(t, { onDelete, onEdit });
	return (
		<ErrorBoundary>
			<LoadingOverlay isLoading={isLoading}>
				<DataTable columns={cols} data={staffs} />
			</LoadingOverlay>
		</ErrorBoundary>
	);
};
