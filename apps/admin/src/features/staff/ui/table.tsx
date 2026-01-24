import type { Staff } from "@novahair/client";
import { Checkbox, CopyButton } from "@novahair/ui";
import { Avatar, AvatarFallback, AvatarImage } from "@novahair/ui/avatar";
import { Button } from "@novahair/ui/button";
import { DataTable } from "@novahair/ui/data-table/data-table";
import { ErrorBoundary } from "@novahair/ui/error-boundary";
import { IconButton } from "@novahair/ui/icon-button";
import { LoadingOverlay } from "@novahair/ui/loading-overlay";
import { Link } from "@tanstack/react-router";
import type { ColumnDef } from "@tanstack/react-table";
import { t } from "i18next";
import { Edit2, Trash } from "lucide-react";
import { ServicesAssignedCell } from "./services-assigned-cell";

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
			cell: ({ row }) => (
				<div className="flex gap-2 items-center">
					<Avatar>
						<AvatarImage
							src={row.original.avatarUrl ?? ""}
							alt={t("image_url")}
							className=""
						/>
						<AvatarFallback>
							{row.original.name.charAt(0).toUpperCase()}
						</AvatarFallback>
					</Avatar>
					{row.getValue("name")}
				</div>
			),
		},

		{
			accessorKey: "email",
			header: () => {
				return <span>{t("email")}</span>;
			},
			cell: ({ row }) => (
				<div className="flex gap-2 items-center group">
					{row.getValue("email")}
					<CopyButton
						text={row.getValue("email")}
						size="sm"
						variant="ghost"
						className="opacity-0 group-hover:opacity-100 transition-opacity"
					/>
				</div>
			),
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
			accessorKey: "services",
			meta: {
				filterVariant: "null",
			},
			header: () => {
				return <span>{t("services")}</span>;
			},
			cell: ({ row }) => {
				const services = row.getValue("services") as Staff["services"];
				return (
					<ServicesAssignedCell
						staffId={row.original.id}
						assignedServiceIds={services.map((s) => s.id)}
					/>
				);
			},
		},

		{
			id: "actions",
			enableHiding: false,
			cell: ({ row }) => {
				const staff = row.original;

				return (
					<div className="flex items-center justify-end gap-2">
						<Button variant="ghost" size="sm" onClick={() => onEdit?.(staff)}>
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
										`¿Estás seguro que quieres borrar el staff "${staff.name}"?`,
									)
								) {
									onDelete?.(staff);
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
		<ErrorBoundary>
			<LoadingOverlay isLoading={isLoading}>
				<DataTable data={staffs} columns={cols} />
			</LoadingOverlay>
		</ErrorBoundary>
	);
};
