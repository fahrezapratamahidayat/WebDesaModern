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
import { KegiatanDesa } from "@prisma/client";
import { KegiatanDesaForm } from "../form/form-kegiatan";

export const columns: ColumnDef<KegiatanDesa>[] = [
  {
    accessorKey: "nama",
    header: ({ column }) => <div className="">Nama Kegiatan</div>,
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("nama")}</div>;
    },
  },
  {
    accessorKey: "jenis",
    header: ({ column }) => <div className="">Jenis Kegiatan</div>,
    cell: ({ row }) => {
      return <Badge variant="outline">{row.getValue("jenis")}</Badge>;
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
    accessorKey: "waktu",
    header: () => <div className="hidden sm:table-cell">Waktu</div>,
    cell: ({ row }) => {
      return <div className="hidden sm:table-cell">{row.getValue("waktu")}</div>;
    },
  },
  {
    accessorKey: "lokasi",
    header: () => <div className="hidden sm:table-cell">Lokasi</div>,
    cell: ({ row }) => {
      return <div className="hidden sm:table-cell">{row.getValue("lokasi")}</div>;
    },
  },
  {
    accessorKey: "postedBy",
    header: () => <div className="hidden sm:table-cell">Penulis</div>,
    cell: ({ row }) => {
      return <div className="hidden font-medium sm:table-cell">{row.getValue("postedBy")}</div>;
    },
  },
  {
    header: () => <div className="">Action</div>,
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const kegiatan = row.original;
      const kegiatanId = kegiatan.id;
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
              Edit kegiatan
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Trash2 className="mr-2 w-4 h-4" />
              Hapus kegiatan
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

export default function TableKegiatanDesa<TData extends KegiatanDesa, TValue>({
  data,
  columns,
}: DataTableProps<TData, TValue>) {
  const [kegiatanId, setKegiatanId] = useState<number>(0);
  const [selectedKegiatan, setSelectedKegiatan] = useState({} as KegiatanDesa);

  const { toast } = useToast();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [jenisFilter, setJenisFilter] = useState("");
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
          <CardTitle>Kegiatan Desa</CardTitle>
          <CardDescription>
            Kelola Kegiatan Desa Anda dan lihat informasi terkait.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 pb-4 lg:flex-row lg:items-center">
            <Input
              placeholder="Cari Kegiatan disini ..."
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
                  Filter Jenis <ChevronDown className="ml-2 w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onSelect={() => setJenisFilter("")}>
                  <DropdownMenuCheckboxItem
                    onCheckedChange={() => setJenisFilter("")}
                    checked={jenisFilter === ""}
                  >
                    Semua
                  </DropdownMenuCheckboxItem>
                </DropdownMenuItem>
                {/* Add more DropdownMenuItems for different jenis kegiatan */}
              </DropdownMenuContent>
            </DropdownMenu>
            <div className="flex items-center">
              <KegiatanDesaForm />
            </div>
          </div>
          <Table>
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
                    className="h-80 text-center"
                  >
                    Tidak ada data
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <div className="flex justify-end items-center py-4 space-x-2">
        <div className="flex-1 text-sm text-muted-foreground">
          Menampilkan
          <strong> {table.getFilteredRowModel().rows.length}</strong> kegiatan
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