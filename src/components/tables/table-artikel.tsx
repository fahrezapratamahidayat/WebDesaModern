"use client";
import {
  ArrowUpDown,
  ChevronDown,
  Edit2,
  EyeIcon,
  MoreHorizontal,
  Trash2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import React, { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ArtikelDesa } from "@/types/type";
import { ArticleDesaForm } from "../form/form-artikel";

export const columns: ColumnDef<ArtikelDesa>[] = [
  {
    accessorKey: "judul",
    header: ({ column }) => <div className="">Judul</div>,
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("judul")}</div>;
    },
  },
  {
    accessorKey: "kategori",
    header: ({ column }) => <div className="">Kategori</div>,
    cell: ({ row }) => {
      return <Badge variant="outline">{row.getValue("kategori")}</Badge>;
    },
  },
  {
    accessorKey: "tanggal",
    header: ({ column, table }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => {
            const isSortedAsc = column.getIsSorted() === "asc";
            table.setSorting([{ id: column.id, desc: isSortedAsc }]);
          }}
        >
          Tanggal
          <ArrowUpDown
            className={`ml-2 w-4 h-4 ${
              column.getIsSorted()
                ? column.getIsSorted() === "asc"
                  ? "rotate-180"
                  : ""
                : ""
            }`}
          />
        </Button>
      );
    },
    cell: ({ row }) => {
      const tanggal = new Date(row.getValue("tanggal"));
      return (
        <div className="p-4 align-middle [&:has([role=checkbox])]:pr-0 hidden sm:table-cell">
          {tanggal.toLocaleDateString("id-ID")}
        </div>
      );
    },
  },
  {
    accessorKey: "penulis",
    header: () => <div className="hidden sm:table-cell">Penulis</div>,
    cell: ({ row }) => {
      const penulis = row.getValue("penulis") as { nama: string };
      return (
        <div className="hidden font-medium sm:table-cell">{penulis.nama}</div>
      );
    },
  },
  {
    header: () => <div className="">Action</div>,
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const artikel = row.original;
      const artikelId = artikel.id;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-haspopup="true" size="icon" variant="ghost">
              <MoreHorizontal className="w-4 h-4" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>
              <EyeIcon className="mr-2 w-4 h-4" />
              Lihat
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Edit2 className="mr-2 w-4 h-4" />
              Edit artikel
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Trash2 className="mr-2 w-4 h-4" />
              Hapus artikel
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export default function TableArtikel<TData extends ArtikelDesa, TValue>({
  data,
  columns,
}: DataTableProps<TData, TValue>) {
  const [artikelId, setArtikelId] = useState<number>(0);
  const [selectedArtikel, setSelectedArtikel] = useState({} as ArtikelDesa);

  const { toast } = useToast();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [statusFilter, setStatusFilter] = useState("");
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Artikel Desa</CardTitle>
          <CardDescription>
            Kelola Artikel Desa Anda dan lihat performa penjualan mereka.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 pb-4 lg:flex-row lg:items-center">
            <Input
              placeholder="Cari Artikel disini ..."
              value={(table.getState().globalFilter as string) ?? ""}
              onChange={(event) => {
                const value = event.target.value;
                table.setGlobalFilter(value);
              }}
              className="max-w-sm"
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="lg:ml-auto">
                  Columns <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className={cn(`capitalize`, {})}
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="">
                  Filter Status <ChevronDown className="ml-2 w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onSelect={() => setStatusFilter("")}>
                  <DropdownMenuCheckboxItem
                    onCheckedChange={() => setStatusFilter("")}
                    checked={statusFilter === ""}
                  >
                    Semua
                  </DropdownMenuCheckboxItem>
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setStatusFilter("Tersedia")}>
                  <DropdownMenuCheckboxItem
                    onCheckedChange={() => setStatusFilter("Tersedia")}
                    checked={statusFilter === "Tersedia"}
                  >
                    Tersedia
                  </DropdownMenuCheckboxItem>
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setStatusFilter("Dipesan")}>
                  <DropdownMenuCheckboxItem
                    onCheckedChange={() => setStatusFilter("Dipesan")}
                    checked={statusFilter === "Dipesan"}
                  >
                    Dipesan
                  </DropdownMenuCheckboxItem>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <div className="flex items-center">
              <ArticleDesaForm />
            </div>
          </div>
          <Table>
            {" "}
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell className="" key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-96 text-center"
                  >
                    <div className="flex justify-center flex-col gap-5 items-center h-full py-5">
                      <svg
                        width="184"
                        height="152"
                        viewBox="0 0 184 152"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g fill="none" fillRule="evenodd">
                          <g transform="translate(24 31.67)">
                            <ellipse
                              fillOpacity=".8"
                              fill="#F5F5F7"
                              cx="67.797"
                              cy="106.89"
                              rx="67.797"
                              ry="12.668"
                            />
                            <path
                              d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z"
                              fill="#AEB8C2"
                            />
                            <path
                              d="M101.537 86.214L80.63 61.102c-1.001-1.207-2.507-1.867-4.048-1.867H31.724c-1.54 0-3.047.66-4.048 1.867L6.769 86.214v13.792h94.768V86.214z"
                              fill="url(#linearGradient-1)"
                              transform="translate(13.56)"
                            />
                            <path
                              d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z"
                              fill="#F5F5F7"
                            />
                            <path
                              d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z"
                              fill="#DCE0E6"
                            />
                          </g>
                          <path
                            d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z"
                            fill="#DCE0E6"
                          />
                          <g transform="translate(149.65 15.383)" fill="#FFF">
                            <ellipse
                              cx="20.654"
                              cy="3.167"
                              rx="2.849"
                              ry="2.815"
                            />
                            <path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z" />
                          </g>
                        </g>
                      </svg>
                      <span className="text-sm text-center ">
                        Tidak ada data :(
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
        {/* <CardFooter>
          <div className="text-xs text-muted-foreground">
            Menampilkan{" "}
            <strong>
              {data.currentPage * data.limit - data.limit + 1}-
              {Math.min(data.currentPage * data.limit, data.totalRooms)}
            </strong>{" "}
            dari <strong>{data.totalRooms}</strong> kamar
          </div>
        </CardFooter> */}
      </Card>
      <div className="flex justify-end items-center py-4 space-x-2">
        <div className="flex-1 text-sm text-muted-foreground">
          Menampilkan
          <strong> {table.getFilteredRowModel().rows.length}</strong> artikel
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
}
