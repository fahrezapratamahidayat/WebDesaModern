"use client";

import React, { useState } from "react";
import {
  ArrowUpDown,
  ChevronDown,
  Copy,
  Edit2,
  EyeIcon,
  MoreHorizontal,
  Plus,
  Trash2,
} from "lucide-react";
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
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { GaleriForm } from "../form/form-galeri";
import Image from "next/image";
import { toast } from "sonner";
import { useGaleriStore } from "@/hooks/use-galeri-store";
import FormDelete from "../form/form-delete";

type GambarGaleri = {
  id: string;
  blob: Buffer;
  keterangan: string;
  createdAt: Date;
};

export const columns: ColumnDef<GambarGaleri>[] = [
  {
    accessorKey: "gambar",
    header: "Gambar",
    cell: ({ row }) => {
      return (
        <div className="font-medium">
          <Image
            src={`data:image/png;base64,${row.original.blob}`}
            alt="Gambar Galeri"
            width={100}
            height={100}
          />
        </div>
      );
    },
  },
  {
    accessorKey: "keterangan",
    header: "Keterangan",
    cell: ({ row }) => {
      return (
        <div>
          {row &&
            (row.getValue("keterangan") as string).substring(0, 20) + "..."}
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className=""
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tanggal Dibuat
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="ml-8">
          {new Date(row.getValue("createdAt")).toLocaleDateString("id-ID")}
        </div>
      );
    },
  },
  {
    id: "actions",
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const galeri = row.original;
      const { openDeleteDialog, seteditingGaleri } =
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useGaleriStore();
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={async () => {
                try {
                  const response = await fetch(
                    `data:image/png;base64,${galeri.blob}`
                  );
                  const blob = await response.blob();
                  await navigator.clipboard.write([
                    new ClipboardItem({
                      [blob.type]: blob,
                    }),
                  ]);
                  toast.success("Gambar berhasil disalin ke clipboard!");
                } catch (error) {
                  console.error("Gagal menyalin gambar:", error);
                  toast.error("Gagal menyalin gambar. Silakan coba lagi.");
                }
              }}
            >
              <Copy className="mr-2 h-4 w-4" />
              Salin Gambar
            </DropdownMenuItem>
            <DropdownMenuItem>
              <EyeIcon className="mr-2 h-4 w-4" />
              Lihat gambar
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => seteditingGaleri(galeri)}>
              <Edit2 className="mr-2 h-4 w-4" />
              Edit keterangan
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => openDeleteDialog(galeri)}>
              <Trash2 className="mr-2 h-4 w-4" />
              Hapus gambar
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
  refreshData: () => void;
}

export default function TableGambarGaleri<TData extends GambarGaleri, TValue>({
  data,
  columns,
  refreshData,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const { openCreateDialog, isDialogOpen, deletingGaleri, closeDialog, formMode } = useGaleriStore();

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
      <GaleriForm refreshData={refreshData} />
      <Card>
        <CardHeader>
          <CardTitle>Galeri Gambar</CardTitle>
          <CardDescription>
            Kelola gambar-gambar dalam galeri Anda.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center py-4 flex-wrap gap-2">
            <Input
              placeholder="Cari gambar..."
              value={
                (table.getColumn("keterangan")?.getFilterValue() as string) ??
                ""
              }
              onChange={(event) =>
                table
                  .getColumn("keterangan")
                  ?.setFilterValue(event.target.value)
              }
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
            <div className="flex items-center">
              <Button onClick={openCreateDialog} className=" font-medium">
                <Plus className="mr-2 h-4 w-4 " />
                Tambah Galeri
              </Button>
            </div>
          </div>
          <Table>
            <TableHeader>
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
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <FormDelete
        isOpen={formMode === "delete" && isDialogOpen}
        onClose={closeDialog}
        itemToDelete={{
          id: deletingGaleri?.id || "",
          name: deletingGaleri?.keterangan || "",
        }}
        entityName="Galeri"
        apiEndpoint="/galeri"
        refreshData={refreshData}
      />
      <div className="flex justify-end items-center py-4 space-x-2">
        <div className="flex-1 text-sm text-muted-foreground">
          Menampilkan <strong>{table.getFilteredRowModel().rows.length}</strong>{" "}
          Galeri
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
