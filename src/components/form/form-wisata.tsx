"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Loader2, PlusCircle } from "lucide-react";
import { FileUploader } from "../ui/file-uploader";
import { useWisataStore } from "@/hooks/use-wisata-store";
import { toast } from "sonner";
import axios from "axios";
import { UploadedFilesCard } from "../card/uploaded-files-card";

const formSchema = z.object({
  nama: z.string().min(2, {
    message: "Nama wisata harus minimal 2 karakter.",
  }),
  deskripsi: z.string().min(10, {
    message: "Deskripsi harus minimal 10 karakter.",
  }),
  lokasi: z.string().min(2, {
    message: "Lokasi harus diisi.",
  }),
  alamat: z.string().min(5, {
    message: "Alamat harus minimal 5 karakter.",
  }),
  telepon: z.string().min(10, {
    message: "Nomor telepon harus valid.",
  }),
  email: z
    .string()
    .email({
      message: "Email harus valid.",
    })
    .optional()
    .or(z.literal("")),
  website: z
    .string()
    .url({
      message: "Website harus berupa URL yang valid.",
    })
    .optional()
    .or(z.literal("")),
  gambar: z.array(z.instanceof(File)).optional(),
});

export function WisataDesaForm({ refreshData }: { refreshData: () => void }) {
  const {
    isDialogOpen,
    formMode,
    editingWisata,
    closeDialog,
    seteditingWisata,
  } = useWisataStore();
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [deletedImageIds, setDeletedImageIds] = useState<string[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nama: "",
      deskripsi: "",
      lokasi: "",
      alamat: "",
      telepon: "",
      email: "",
      website: "",
    },
  });

  const handleImageDelete = (imageId: string) => {
    setDeletedImageIds((prev) => [...prev, imageId]);
    if (editingWisata && editingWisata.GambarWisataGaleri) {
      seteditingWisata({
        ...editingWisata,
        GambarWisataGaleri: editingWisata.GambarWisataGaleri.filter(
          (img) => img.id !== imageId
        ),
      });
    }
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();

    formData.append(
      "wisataData",
      JSON.stringify({
        nama: values.nama,
        deskripsi: values.deskripsi,
        lokasi: values.lokasi,
        alamat: values.alamat,
        telepon: values.telepon,
        email: values.email,
        website: values.website,
      })
    );
    if (values.gambar && values.gambar.length > 0) {
      values.gambar.forEach((file, index) => {
        formData.append("gambar", file);
      });
    }
    if (formMode === "create" && values.gambar && values.gambar.length === 0) {
      toast.error("Gambar harus diisi");
      return;
    }
    
    formData.append("deletedImageIds", JSON.stringify(deletedImageIds));

    try {
      const url = `http://localhost:3000/api/wisata${formMode === "update" ? `?id=${editingWisata?.id}` : ""}`;
      const method = formMode === "update" ? "PUT" : "POST";
      toast.promise(axios({ url, method, data: formData }), {
        loading: `Sedang ${formMode === "update" ? "memperbarui" : "membuat"} Wisata...`,
        success: () => {
          refreshData();
          return `Wisata berhasil ${formMode === "update" ? "diperbarui" : "dibuat"}`;
        },
        error: `Gagal ${formMode === "update" ? "memperbarui" : "membuat"} Wisata`,
      });
      setLoading(false);
      closeDialog();
      form.reset();
    } catch (error) {
      toast.error(
        `Gagal ${formMode === "update" ? "memperbarui" : "membuat"} Wisata`
      );
      setLoading(false);
    }
  }

  useEffect(() => {
    if (editingWisata) {
      Object.keys(editingWisata).forEach((key) => {
        form.setValue(
          key as any,
          editingWisata[key as keyof typeof editingWisata]
        );
      });
    }
    if (formMode === "create") {
      form.reset();
    }
  }, [editingWisata, form, formMode]);
  return (
    <Dialog
      open={formMode !== "delete" && isDialogOpen}
      onOpenChange={closeDialog}
    >
      <DialogContent className="sm:max-w-[1200px] h-[600px]">
        <DialogHeader>
          <DialogTitle>
            {formMode === "update" ? "Edit Wisata" : "Tambah Wisata Baru"}
          </DialogTitle>
          <DialogDescription>
            Isi form berikut untuk menambahkan wisata baru ke dalam sistem.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid lg:grid-cols-3 grid-cols-1 gap-4 mx-2">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="nama"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama Wisata</FormLabel>
                      <FormControl>
                        <Input placeholder="Nama wisata" {...field} />
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
                          placeholder="Deskripsi wisata"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lokasi"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Lokasi</FormLabel>
                      <FormControl>
                        <Input placeholder="Lokasi wisata" {...field} />
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
                        <Input placeholder="Alamat lengkap" {...field} />
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
                      <FormLabel>Telepon</FormLabel>
                      <FormControl>
                        <Input placeholder="Nomor telepon" {...field} />
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
                        <Input placeholder="Email" {...field} />
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
                        <Input placeholder="Website" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-4">
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
                {formMode === "update" && editingWisata && (
                  <UploadedFilesCard
                    uploadedFiles={editingWisata.GambarWisataGaleri.map(
                      (img: { id: string; url: string }) => ({
                        key: img.id,
                        url: `http://localhost:3000${img.url}`,
                        name: img.id,
                      })
                    )}
                    onDelete={handleImageDelete}
                  />
                )}
              </div>
            </div>
            {loading ? (
              <Button className="w-full " type="submit" disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading
              </Button>
            ) : (
              <Button type="submit" className="w-full ">
                Simpan
              </Button>
            )}
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
