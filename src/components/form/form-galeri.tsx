"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2 } from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import axios, { AxiosError } from "axios";
import { FileUploader } from "../ui/file-uploader";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { useGaleriStore } from "@/hooks/use-galeri-store";
import Image from "next/image";

const formSchema = z.object({
  keterangan: z.string().min(10, {
    message: "keterangan harus memiliki minimal 10 karakter.",
  }),
  gambar: z.array(z.instanceof(File)),
});

export function GaleriForm({ refreshData }: { refreshData: () => void }) {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  const {
    isDialogOpen,
    formMode,
    editingGaleri,
    closeDialog,
  } = useGaleriStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      keterangan: "",
      gambar: [],
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();

    formData.append(
      "galeri",
      JSON.stringify({
        keterangan: values.keterangan,
      })
    );

    values.gambar.forEach((file, index) => {
      formData.append("gambar", file);
    });

    if (formMode === "create" && values.gambar && values.gambar.length === 0) {
      toast.error("Gambar harus diisi");
      return;
    }

    try {
      const url = `http://localhost:3000/api/galeri${formMode === "update" ? `?id=${editingGaleri?.id}` : ""}`;
      const method = formMode === "update" ? "PUT" : "POST";

      toast.promise(
        axios({
          url,
          method,
          data: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }),
        {
          loading: `Sedang ${formMode === "update" ? "memperbarui" : "membuat"} Galeri...`,
          success: () => {
            refreshData();
            return `Galeri berhasil ${formMode === "update" ? "diperbarui" : "dibuat"}`;
          },
          error: `Gagal ${formMode === "update" ? "memperbarui" : "membuat"} Galeri`,
        }
      );
      setLoading(false);
      closeDialog();
      form.reset();
      refreshData();
    } catch (error: AxiosError | any) {
      toast.error(
        `Gagal ${formMode === "update" ? "memperbarui" : "membuat"} Galeri`
      );
      setLoading(false);
    }
  }

  useEffect(() => {
    if (editingGaleri) {
      Object.keys(editingGaleri).forEach((key) => {
        form.setValue(
          key as any,
          editingGaleri[key as keyof typeof editingGaleri]
        );
      });
    }
    if (formMode === "create") {
      form.reset();
    }
  }, [editingGaleri, form, formMode]);

  return (
    <Dialog
      open={formMode !== "delete" && isDialogOpen}
      onOpenChange={closeDialog}
    >
      <DialogContent className="sm:max-w-[1200px] h-[600px]">
        <DialogHeader>
          <DialogTitle>
            {formMode === "update" ? "Edit Galeri" : "Tambah Galeri Baru"}
          </DialogTitle>
          <DialogDescription>
            Isi formulir di bawah ini untuk{" "}
            {formMode === "update" ? "mengedit" : "menambahkan"} Galeri Desa{" "}
            {formMode === "update" ? "" : "baru"}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <ScrollArea className="pr-3">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid lg:grid-cols-1 grid-cols-1 gap-4 mx-2">
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="gambar"
                    render={({ field }) => (
                      <FormItem
                        className={`${formMode === "update" ? "hidden" : ""}`}
                      >
                        <FormLabel>Gambar Galeri Desa</FormLabel>
                        <FormControl>
                          <div className="space-y-4">
                            <FileUploader
                              value={field.value}
                              onValueChange={(newFiles) => {
                                field.onChange(newFiles);
                                setFiles(newFiles);
                              }}
                              maxFiles={1}
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
                  <div className={`${formMode === "update" ? "space-y-4" : "hidden"}`}>
                    <div className="relative flex flex-col gap-6 overflow-hidden">
                      <div className="group relative grid h-72 w-full place-items-center rounded-lg px-5 py-2.5 text-center transition ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                      <Image src={`data:image/png;base64,${editingGaleri?.blob}`} alt="gambar galeri" width={100} height={100} className="w-full h-full object-cover" />
                      </div>
                    </div>
                  </div>
                  <FormField
                    control={form.control}
                    name="keterangan"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Keterangan Gambar</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Masukkan keterangan gambar"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              {loading ? (
                <Button className="w-full " type="submit" disabled>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Loading
                </Button>
              ) : (
                <Button type="submit" className="w-full ">
                  {formMode === "update" ? "Update" : "Tambah"} Galeri
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
