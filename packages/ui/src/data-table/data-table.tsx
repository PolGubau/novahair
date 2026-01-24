import { cn } from "@novahair/utils";
import {
	type Column,
	type ColumnDef,
	type PaginationState,
	type RowData,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { t } from "i18next";
import { FilterIcon } from "lucide-react";
import { useState } from "react";
import { DebouncedInput } from "../debounced-input";
import { IconButton } from "../icon-button";
import { Input } from "../input";
import { Popover } from "../popover";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "../table";

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
}
declare module "@tanstack/react-table" {
	//allows us to define custom properties for our columns
	interface ColumnMeta<TData extends RowData, TValue> {
		filterVariant?: "text" | "range" | "select" | "date" | "null";
	}
}
export function DataTable<TData, TValue>({
	columns,
	data,
}: DataTableProps<TData, TValue>) {
	const [pagination, setPagination] = useState<PaginationState>({
		pageIndex: 0,
		pageSize: 10,
	});
	const table = useReactTable({
		data,
		state: {
			pagination,
		},
		onPaginationChange: setPagination,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(), //client side filtering
		getSortedRowModel: getSortedRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		columns,
	});

	return (
		<div className="overflow-auto rounded-md h-full divide-y border border-foreground/10 grid grid-rows-[1fr_auto]">
			<Table>
				<TableHeader className="border-b  border-foreground/10 bg-foreground/2">
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map((header) => {
								const isLeafColumn = header.subHeaders.length === 0;
								return (
									<TableHead key={header.id}>
										<div className="flex items-center gap-2">
											<div
												className={cn(
													"flex items-center gap-2 py-2",
													isLeafColumn ? "justify-between" : "justify-center",
													{
														"cursor-pointer select-none":
															isLeafColumn && header.column.getCanSort(),
													},
												)}
												{...{
													onClick: isLeafColumn
														? header.column.getToggleSortingHandler()
														: undefined,
												}}
											>
												{header.isPlaceholder
													? null
													: flexRender(
															header.column.columnDef.header,
															header.getContext(),
														)}
												{isLeafColumn && (
													<span>
														{{
															asc: "↑",
															desc: "↓",
														}[header.column.getIsSorted() as string] ??
															null}{" "}
													</span>
												)}
											</div>
											{/* Solo mostrar filtros en columnas leaf (no en grupos) */}
											{!header.isPlaceholder &&
											header.column.getCanFilter() &&
											isLeafColumn
												? header.column.columnDef.meta?.filterVariant !==
														"null" && (
														<Popover
															trigger={
																<IconButton
																	size="sm"
																	variant="ghost"
																	icon={<FilterIcon className="size-4" />}
																/>
															}
														>
															<div className="flex justify-between">
																<strong>{t("filter")}</strong>
																<Filter column={header.column} />
															</div>
														</Popover>
													)
												: null}
										</div>
									</TableHead>
								);
							})}
						</TableRow>
					))}
				</TableHeader>
				<TableBody>
					{table.getRowModel().rows?.length ? (
						table.getRowModel().rows.map((row) => (
							<TableRow
								key={row.id}
								data-state={row.getIsSelected() && "selected"}
							>
								{row.getVisibleCells().map((cell) => (
									<TableCell key={cell.id}>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</TableCell>
								))}
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell colSpan={columns.length} className="h-24 text-center">
								{t("no_results")}
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
			<footer className="flex max-lg:flex-col lg:items-center lg:justify-between p-4">
				<div className="flex items-center gap-4">
					<div className="flex gap-1">
						<IconButton
							size="sm"
							onClick={() => table.setPageIndex(0)}
							disabled={!table.getCanPreviousPage()}
						>
							{"<<"}
						</IconButton>
						<IconButton
							size="sm"
							onClick={() => table.previousPage()}
							disabled={!table.getCanPreviousPage()}
						>
							{"<"}
						</IconButton>
						<IconButton
							size="sm"
							onClick={() => table.nextPage()}
							disabled={!table.getCanNextPage()}
						>
							{">"}
						</IconButton>
						<IconButton
							size="sm"
							onClick={() => table.setPageIndex(table.getPageCount() - 1)}
							disabled={!table.getCanNextPage()}
						>
							{">>"}
						</IconButton>{" "}
					</div>

					<span className="flex items-center gap-1">
						<div>{t("page")}</div>
						<strong>
							{t("x_of_y", {
								x: table.getState().pagination.pageIndex + 1,
								y: table.getPageCount(),
							})}
						</strong>
					</span>
					{/* <span className="flex items-center gap-1">
						Go to page:
						<input
							type="number"
							min="1"
							max={table.getPageCount()}
							defaultValue={table.getState().pagination.pageIndex + 1}
							onChange={(e) => {
								const page = e.target.value ? Number(e.target.value) - 1 : 0;
								table.setPageIndex(page);
							}}
							className="border p-1 rounded w-16"
						/>
					</span>
					<select
						value={table.getState().pagination.pageSize}
						onChange={(e) => {
							table.setPageSize(Number(e.target.value));
						}}
					>
						{[10, 20, 30, 40, 50].map((pageSize) => (
							<option key={pageSize} value={pageSize}>
								Show {pageSize}
							</option>
						))}
					</select> */}
				</div>

				<div>
					{table.getRowModel().rows.length} {t("rows")}
				</div>
			</footer>
		</div>
	);
}

// biome-ignore lint/suspicious/noExplicitAny: Any data
function Filter({ column }: { column: Column<any, unknown> }) {
	const columnFilterValue = column.getFilterValue();
	const { filterVariant } = column.columnDef.meta ?? {};

	return filterVariant === "range" ? (
		<div>
			<div className="flex space-x-2">
				{/* See faceted column filters example for min max values functionality */}
				<DebouncedInput
					type="number"
					value={(columnFilterValue as [number, number])?.[0] ?? ""}
					onChange={(value) =>
						column.setFilterValue((old: [number, number]) => [value, old?.[1]])
					}
					placeholder={"Min"}
					className="w-24 border shadow rounded"
				/>
				<DebouncedInput
					type="number"
					value={(columnFilterValue as [number, number])?.[1] ?? ""}
					onChange={(value) =>
						column.setFilterValue((old: [number, number]) => [old?.[0], value])
					}
					placeholder={"Max"}
					className="w-24 border shadow rounded"
				/>
			</div>
			<div className="h-1" />
		</div>
	) : filterVariant === "select" ? (
		<select
			onChange={(e) => column.setFilterValue(e.target.value)}
			value={columnFilterValue?.toString()}
		>
			{/* See faceted column filters example for dynamic select options */}
			<option value="">All</option>
			<option value="complicated">complicated</option>
			<option value="relationship">relationship</option>
			<option value="single">single</option>
		</select>
	) : filterVariant === "date" ? (
		<DebouncedInput
			type="date"
			value={columnFilterValue as string}
			onChange={(value) => column.setFilterValue(value)}
			className="w-36 border shadow rounded"
		/>
	) : (
		<Input
			size="sm"
			className="w-36 border shadow rounded"
			onChange={(e) => column.setFilterValue(e.target.value)}
			placeholder={"Search..."}
			type="search"
			value={(columnFilterValue ?? "") as string}
		/>
	);
}
