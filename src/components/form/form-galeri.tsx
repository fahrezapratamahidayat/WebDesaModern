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
import { useSWRConfig } from "swr";

const formSchema = z.object({
  keterangan: z.string().min(10, {
    message: "keterangan harus memiliki minimal 10 karakter.",
  }),
  gambar: z.array(z.instanceof(File)),
});

export function GaleriForm() {
  const [open, setOpen] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      keterangan: "",
      gambar: [],
    },
  });
  const { mutate } = useSWRConfig();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();
    console.log(values);

    formData.append(
      "galeri",
      JSON.stringify({
        keterangan: values.keterangan,
      })
    );

    values.gambar.forEach((file, index) => {
      formData.append("gambar", file);
    });

    try {
      const url = "http://localhost:3000/api/galeri";
      const method = "POST";
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
          loading: "Loading",
          success: "Berhasil",
          error: "gagal dibuat",
        }
      );
      setLoading(false);
      form.reset();
      mutate("/api/galeri");
      setOpen(false);
    } catch (error: AxiosError | any) {
      toast.error(`Gagal ${error.response?.data.message || error.message}`);
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className=" font-medium">
          <Plus className="mr-2 h-4 w-4 " />
          Tambah Galeri Desa
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[1200px] h-[600px]">
        <DialogHeader>
          <DialogTitle>Tambah Galeri Desa Baru</DialogTitle>
          <DialogDescription>
            Isi formulir di bawah ini untuk menambahkan Galeri Desa baru.
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
                      <FormItem>
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
