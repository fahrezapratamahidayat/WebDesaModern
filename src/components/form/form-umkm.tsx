"use client";
import { useState } from "react";
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import axios from "axios";
import { FileUploader } from "../ui/file-uploader";
import { UploadedFilesCard } from "../card/uploaded-files-card";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

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
  images: z.array(z.instanceof(File)),
});

export function UMKMForm() {
  const [open, setOpen] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
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
      images: [],
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      const formData = new FormData();
      Object.keys(values).forEach((key) => {
        if (key !== "images") {
          formData.append(key, values[key as keyof typeof values] as string);
        }
      });
      values.images.forEach((file, index) => {
        formData.append(`images`, file);
      });

      await axios.post("/api/umkm", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setLoading(false);
      form.reset();
      setFiles([]);
      toast.success("UMKM berhasil ditambahkan");
      setOpen(false);
    } catch (error) {
      setLoading(false);
      console.error("Error:", error);
      toast.error("Gagal menambahkan UMKM");
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="text-white font-medium">
          <Plus className="mr-2 h-4 w-4 text-white" />
          Tambah UMKM
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[1200px] max-w-md">
        <DialogHeader>
          <DialogTitle>Tambah UMKM Baru</DialogTitle>
          <DialogDescription>
            Isi formulir di bawah ini untuk menambahkan UMKM baru.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <ScrollArea>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid lg:grid-cols-3 grid-cols-1 gap-4">
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
                        <FormLabel>Jenis Usaha</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Masukkan jenis usaha"
                            {...field}
                          />
                        </FormControl>
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
                </div>
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Masukkan email (opsional)"
                            {...field}
                          />
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
                        <FormLabel>Website</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Masukkan website (opsional)"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
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
                </div>
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="images"
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
                              maxFiles={5}
                              maxSize={1024 * 1024 * 10}
                              accept={{ "image/*": [] }}
                              multiple={true}
                            />
                            {/* <UploadedFilesCard
                            uploadedFiles={files.map((file) => ({
                              key: file.name,
                              url: URL.createObjectURL(file),
                              name: file.name,
                            }))}
                          /> */}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              {loading ? (
                <Button className="w-full" type="submit" disabled>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Loading
                </Button>
              ) : (
                <Button type="submit" className="w-full">
                  Tambah UMKM
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
