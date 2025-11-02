import { createFileRoute } from "@tanstack/react-router";
import type { ColumnDef } from "@tanstack/react-table";
import { t } from "i18next";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import type { Service } from "~/features/appointment-form/domain/service";
import { useServices } from "~/features/appointment-form/model/use-services";
import { Button } from "~/shared/ui/button";
import { Checkbox } from "~/shared/ui/checkbox";
import { DataTable } from "~/shared/ui/data-table";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "~/shared/ui/dropdown-menu";
import { AdminMain } from "~/shared/ui/layouts/admin/admin-main";
import { LoadingOverlay } from "~/shared/ui/loading-overlay";

export const Route = createFileRoute("/admin/general/services/")({
	component: RouteComponent,
});
export type Payment = {
	id: string;
	amount: number;
	status: "pending" | "processing" | "success" | "failed";
	email: string;
};
export const columns: ColumnDef<Service>[] = [
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
					Name
					<ArrowUpDown />
				</Button>
			);
		},
		cell: ({ row }) => <div className="lowercase">{row.getValue("name")}</div>,
	},
	{
		accessorKey: "description",
		header: () => {
			return <span>Description</span>;
		},
		cell: ({ row }) => (
			<div className="lowercase">{row.getValue("description")}</div>
		),
	},
	{
		accessorKey: "imageUrl",
		header: () => {
			return <span>Image URL</span>;
		},
		cell: ({ row }) => (
			<div className="lowercase">{row.getValue("imageUrl")}</div>
		),
	},
	{
		accessorKey: "priceCents",
		header: () => {
			return (
				<p className="flex gap-1">
					<span>Precio</span>
					<span className="text-sm">(En céntimos)</span>
				</p>
			);
		},
		cell: ({ row }) => (
			<div className="lowercase">{row.getValue("priceCents")}</div>
		),
	},
	{
		id: "actions",
		enableHiding: false,
		cell: ({ row }) => {
			const payment = row.original;

			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="h-8 w-8 p-0">
							<span className="sr-only">Open menu</span>
							<MoreHorizontal />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuLabel>Actions</DropdownMenuLabel>
						<DropdownMenuItem
							onClick={() => navigator.clipboard.writeText(payment.id)}
						>
							Copy payment ID
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem>View customer</DropdownMenuItem>
						<DropdownMenuItem>View payment details</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];
function RouteComponent() {
	const { services, isLoading } = useServices();
	return (
		<AdminMain title={"services"} description={"manage_your_services"}>
			<LoadingOverlay isLoading={isLoading}>
				<DataTable data={services} columns={columns} />
			</LoadingOverlay>
		</AdminMain>
	);
}
