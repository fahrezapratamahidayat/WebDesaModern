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
      return (
        <div>
          {row && (row.getValue("nama") as string).substring(0, 30) + "..."}
        </div>
      );
    },
  },
  {
    accessorKey: "jenisUsaha",
    header: ({ column }) => <div className="">Jenis Usaha</div>,
    cell: ({ row }) => {
      return (
        <Badge variant="default" className="capitalize  tracking-normal">
          {row.getValue("jenisUsaha")}
        </Badge>
      );
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
  refreshData: () => void;
}

export default function TableUMKM<TData extends UMKM, TValue>({
  data,
  columns,
  refreshData,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const {
    formMode,
    openCreateDialog,
    isDialogOpen,
    deletingUMKM,
    closeDialog,
  } = useUMKMStore();
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
      <UMKMForm refreshData={refreshData} />
      <FormDelete
        isOpen={formMode === "delete" && isDialogOpen}
        onClose={closeDialog}
        itemToDelete={{
          id: deletingUMKM?.id || "",
          name: deletingUMKM?.nama || "",
        }}
        entityName="UMKM"
        apiEndpoint="/umkm"
        refreshData={refreshData}
      />
      <Card>
        <CardHeader>
          <CardTitle>UMKM Desa</CardTitle>
          <CardDescription>
            Kelola UMKM Desa Anda dan lihat performa penjualan mereka.
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
            <Button onClick={openCreateDialog} className=" font-medium">
              <Plus className="mr-2 h-4 w-4 " />
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
