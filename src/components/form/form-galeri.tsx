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

const formSchema = z.object({
  nama: z.string().min(2, {
    message: "Nama UMKM harus memiliki minimal 2 karakter.",
  }),
  deskripsi: z.string().min(10, {
    message: "Deskripsi harus memiliki minimal 10 karakter.",
  }),
  gambar: z.array(z.instanceof(File)),
});

export function UMKMForm() {
  const [open, setOpen] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      deskripsi: "",
      gambar: [],
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();

    formData.append(
      "galeri",
      JSON.stringify({
        deskripsi: values.deskripsi,
      })
    );

    values.gambar.forEach((file, index) => {
      formData.append("gambar", file);
    });

    try {
      const response = await axios.post(
        "http://localhost:3000/api/galeri",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("berhasil dibuat");
    } catch (error: AxiosError | any) {
      toast("gagal dibuat");
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
      <DialogContent className="sm:max-w-[1200px] h-[600px]">
        <DialogHeader>
          <DialogTitle>Tambah UMKM Baru</DialogTitle>
          <DialogDescription>
            Isi formulir di bawah ini untuk menambahkan UMKM baru.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <ScrollArea className="pr-3">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid lg:grid-cols-1 grid-cols-1 gap-4 mx-2">
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
                </div>
              </div>
              {loading ? (
                <Button className="w-full text-white" type="submit" disabled>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Loading
                </Button>
              ) : (
                <Button type="submit" className="w-full text-white">
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
