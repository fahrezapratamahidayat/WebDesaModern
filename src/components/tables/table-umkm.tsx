/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import {
  ArrowUpDown,
  ChevronDown,
  Edit2,
  EyeIcon,
  MoreHorizontal,
  Plus,
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
import React, { useMemo, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { GambarUMKM, UMKM } from "@prisma/client";
import { UMKMForm } from "../form/form-umkm";
import { useUMKMStore } from "@/hooks/use-umkm-store";
import FormDelete from "../form/form-delete";
import Link from "next/link";

interface UMKMWithGambar extends UMKM {
  GambarUMKM: GambarUMKM[];
}

export const columns: ColumnDef<UMKMWithGambar>[] = [
  {
    accessorKey: "nama",
    header: ({ column }) => <div className="">Nama UMKM</div>,
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("nama")}</div>;
    },
  },
  {
    accessorKey: "jenisUsaha",
    header: ({ column }) => <div className="">Jenis Usaha</div>,
    cell: ({ row }) => {
      return <Badge variant="default" className="capitalize text-white tracking-normal">{row.getValue("jenisUsaha")}</Badge>;
    },
  },
  {
    accessorKey: "produkUtama",
    header: () => <div className="">Produk Utama</div>,
    cell: ({ row }) => {
      return <div>{row.getValue("produkUtama")}</div>;
    },
  },
  {
    accessorKey: "alamat",
    header: () => <div className="hidden sm:table-cell">Alamat</div>,
    cell: ({ row }) => {
      return (
        <div className="hidden sm:table-cell">{row.getValue("alamat")}</div>
      );
    },
  },
  {
    header: () => <div className="">Action</div>,
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const { setEditingUMKM, openDeleteDialog } = useUMKMStore();
      const umkm = row.original;
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
              <Link href={`/#${umkm.nama}`}>Lihat</Link>
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setEditingUMKM(umkm)}>
              <Edit2 className="mr-2 w-4 h-4" />
              Edit UMKM
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={() => {
                openDeleteDialog(umkm);
              }}
            >
              <Trash2 className="mr-2 w-4 h-4" />
              Hapus UMKM
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

export default function TableUMKM<TData extends UMKM, TValue>({
  data,
  columns,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const { editingUMKM, formMode, setEditingUMKM, openCreateDialog } =
    useUMKMStore();
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [statusFilter, setStatusFilter] = useState("");
  const [rowSelection, setRowSelection] = React.useState({});

  const filteredData = useMemo(() => {
    return data.filter((room) => {
      return statusFilter ? room.jenisUsaha === statusFilter : true;
    });
  }, [data, statusFilter]);

  const table = useReactTable({
    data: filteredData,
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
      <UMKMForm />
      <FormDelete />
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
                    onCheckedChange={() => setStatusFilter("makanan")}
                    checked={statusFilter === "makanan"}
                  >
                    makanan
                  </DropdownMenuCheckboxItem>
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setStatusFilter("minuman")}>
                  <DropdownMenuCheckboxItem
                    onCheckedChange={() => setStatusFilter("minuman")}
                    checked={statusFilter === "minuman"}
                  >
                    minuman
                  </DropdownMenuCheckboxItem>
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setStatusFilter("kerajinan")}>
                  <DropdownMenuCheckboxItem
                    onCheckedChange={() => setStatusFilter("kerajinan")}
                    checked={statusFilter === "kerajinan"}
                  >
                    kerajinan
                  </DropdownMenuCheckboxItem>
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setStatusFilter("jasa")}>
                  <DropdownMenuCheckboxItem
                    onCheckedChange={() => setStatusFilter("jasa")}
                    checked={statusFilter === "jasa"}
                  >
                    jasa
                  </DropdownMenuCheckboxItem>
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setStatusFilter("teknologi")}>
                  <DropdownMenuCheckboxItem
                    onCheckedChange={() => setStatusFilter("teknologi")}
                    checked={statusFilter === "teknologi"}
                  >
                    teknologi
                  </DropdownMenuCheckboxItem>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              onClick={openCreateDialog}
              className="text-white font-medium"
            >
              <Plus className="mr-2 h-4 w-4 text-white" />
              Tambah UMKM
            </Button>
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
                    Tidak ada data
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
          Menampilkan <strong>{table.getFilteredRowModel().rows.length}</strong>{" "}
          UMKM
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
