"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import axios, { AxiosError } from "axios";
import { FileUploader } from "../ui/file-uploader";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UMKM } from "@prisma/client";
import { useUMKMStore } from "@/hooks/use-umkm-store";
import { UploadedFilesCard } from "../card/uploaded-files-card";

const formSchema = z.object({
  nama: z.string().min(2, {
    message: "Nama UMKM harus memiliki minimal 2 karakter.",
  }),
  deskripsi: z.string().min(10, {
    message: "Deskripsi harus memiliki minimal 10 karakter.",
  }),
  jenisUsaha: z.string().min(2, {
    message: "Jenis usaha harus memiliki minimal 2 karakter.",
  }),
  produkUtama: z.string().min(2, {
    message: "Produk utama harus memiliki minimal 2 karakter.",
  }),
  keunggulan: z.array(z.string()).min(1, {
    message: "Masukkan minimal satu keunggulan.",
  }),
  alamat: z.string().min(5, {
    message: "Alamat harus memiliki minimal 5 karakter.",
  }),
  telepon: z.string().min(5, {
    message: "Nomor telepon harus memiliki minimal 5 karakter.",
  }),
  email: z
    .string()
    .email({
      message: "Email tidak valid.",
    })
    .optional()
    .or(z.literal("")),
  website: z
    .string()
    .url({
      message: "Website tidak valid.",
    })
    .optional()
    .or(z.literal("")),
  gambar: z.array(z.instanceof(File)),
});

export function UMKMForm() {
  const [open, setOpen] = useState(false);
  const { isDialogOpen, formMode, editingUMKM, closeDialog } = useUMKMStore();
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentUMKMId, setCurrentUMKMId] = useState<string | null>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nama: "",
      deskripsi: "",
      jenisUsaha: "",
      produkUtama: "",
      alamat: "",
      telepon: "",
      email: "",
      website: "",
      gambar: [],
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    const formData = new FormData();

    const keunggulanString = values.keunggulan.join(",");
    formData.append(
      "umkmData",
      JSON.stringify({
        nama: values.nama,
        deskripsi: values.deskripsi,
        jenisUsaha: values.jenisUsaha,
        produkUtama: values.produkUtama,
        keunggulan: keunggulanString,
        alamat: values.alamat,
        telepon: values.telepon,
        email: values.email,
        website: values.website,
      })
    );

    values.gambar.forEach((file, index) => {
      formData.append("gambar", file);
    });

    try {
      const url = `http://localhost:3000/api/umkm${formMode === "update" ? `/${currentUMKMId}` : ""}`;
      const method = formMode === "update" ? "PUT" : "POST";

      const response = await axios({
        method: method,
        url: url,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success(
        `UMKM berhasil ${formMode === "update" ? "diperbarui" : "dibuat"}`
      );
      setLoading(false);
      setOpen(false);
    } catch (error: AxiosError | any) {
      toast.error(
        `Gagal ${formMode === "update" ? "memperbarui" : "membuat"} UMKM`
      );
      setLoading(false);
    }
  }

  useEffect(() => {
    if (editingUMKM) {
      Object.keys(editingUMKM).forEach((key) => {
        form.setValue(key as any, editingUMKM[key as keyof UMKM]);
      });
    }
  }, [editingUMKM, form]);
  return (
    <Dialog open={isDialogOpen} onOpenChange={closeDialog}>
      <DialogContent className="sm:max-w-[1200px] h-[600px]">
        <DialogHeader>
          <DialogTitle>
            {formMode === "create" ? "Tambah UMKM Baru" : "Update UMKM"}
          </DialogTitle>
          <DialogDescription>
            Isi formulir di bawah ini untuk menambahkan UMKM baru.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <ScrollArea className="pr-3">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid lg:grid-cols-3 grid-cols-1 gap-4 mx-2">
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="nama"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nama UMKM</FormLabel>
                        <FormControl>
                          <Input placeholder="Masukkan nama UMKM" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="jenisUsaha"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue
                                placeholder="Masukkan jenis usaha"
                                className="text-muted-foreground placeholder:text-muted-foreground"
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="makanan">Makanan</SelectItem>
                            <SelectItem value="minuman">Minuman</SelectItem>
                            <SelectItem value="kerajinan">Kerajinan</SelectItem>
                            <SelectItem value="jasa">Jasa</SelectItem>
                            <SelectItem value="teknologi">Teknologi</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="produkUtama"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Produk Utama</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Masukkan produk utama"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="alamat"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Alamat</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Masukkan alamat UMKM"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="telepon"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nomor Telepon</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Masukkan nomor telepon"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email (opsional)</FormLabel>
                        <FormControl>
                          <Input placeholder="Masukkan email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="website"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Website (opsional)</FormLabel>
                        <FormControl>
                          <Input placeholder="Masukkan website" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="keunggulan"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Keunggulan</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Masukkan keunggulan (pisahkan dengan koma)"
                            {...field}
                            onChange={(e) =>
                              field.onChange(e.target.value.split(","))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="deskripsi"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Deskripsi</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Masukkan deskripsi UMKM"
                            {...field}
                            className="h-32"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="gambar"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Gambar UMKM</FormLabel>
                        <FormControl>
                          <div className="space-y-4">
                            <FileUploader
                              value={field.value}
                              onValueChange={(newFiles) => {
                                field.onChange(newFiles);
                                setFiles(newFiles);
                              }}
                              maxFiles={3}
                              maxSize={1024 * 1024 * 10}
                              accept={{ "image/*": [] }}
                              multiple={true}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {formMode === "update" && editingUMKM && (
                    <UploadedFilesCard
                      uploadedFiles={editingUMKM.GambarUMKM?.map(
                        (img: { id: string; url: string }) => ({
                          key: img.id,
                          url: `http://localhost:3000${img.url}`,
                          name: img.id,
                        })
                      )}
                    />
                  )}
                </div>
              </div>
              {loading ? (
                <Button className="w-full text-white" type="submit" disabled>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Loading
                </Button>
              ) : (
                <Button type="submit" className="w-full text-white">
                  {formMode === "create" ? "Tambah UMKM" : "Update UMKM"}
                </Button>
              )}
            </form>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
