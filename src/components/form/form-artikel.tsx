"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Loader2, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "sonner";
import axios from "axios";
import { useSession } from "next-auth/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

const formSchema = z.object({
  judul: z.string().min(2, {
    message: "Judul artikel harus memiliki minimal 2 karakter.",
  }),
  slug: z.string().min(2, {
    message: "Slug harus memiliki minimal 2 karakter.",
  }),
  kategori: z.string().min(2, {
    message: "Kategori harus memiliki minimal 2 karakter.",
  }),
  tanggal: z.date({
    required_error: "Tanggal artikel diperlukan.",
  }),
  ringkasan: z.string().min(10, {
    message: "Ringkasan harus memiliki minimal 10 karakter.",
  }),
  isi: z.string().min(50, {
    message: "Isi artikel harus memiliki minimal 50 karakter.",
  }),
  urlArtikel: z.string().url().optional().or(z.literal("")),
  status: z.enum(["Draft", "Publikasi", "Arsip"]).default("Draft"),
});

export function ArticleDesaForm() {
  const [open, setOpen] = useState(false);
  const { data: session }: { data: any } = useSession();
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      judul: "",
      slug: "",
      kategori: "",
      ringkasan: "",
      isi: "",
      status: "Draft",
      urlArtikel: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      const payload = {
        judul: values.judul,
        slug: values.slug,
        kategori: values.kategori,
        tanggal: new Date(values.tanggal),
        ringkasan: values.ringkasan,
        isi: values.isi,
        urlArtikel: values.urlArtikel || null,
        status: values.status,
        penulis: parseInt(session.user.id),
      };
      const response = await axios.post("/api/artikel", payload);

      if (response.data.error) {
        toast.error(response.data.error);
        if (response.data.error.includes("Slug artikel sudah digunakan")) {
          form.setError("slug", {
            type: "manual",
            message:
              "Slug ini sudah digunakan. Silakan gunakan slug yang berbeda.",
          });
        }
      } else {
        form.reset();
        toast.success("Artikel berhasil dibuat");
        setOpen(false);
      }
    } catch (error) {
      console.error("Error:", error);
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.error || "Artikel gagal dibuat");
      } else {
        toast.error("Artikel gagal dibuat");
      }
    } finally {
      setLoading(false);
    }
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className=" font-medium">
          <Plus className="mr-2 h-4 w-4 " />
          Artikel Desa
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[1200px] ">
        <DialogHeader>
          <DialogTitle>Tambah Artikel Desa</DialogTitle>
          <DialogDescription>
            Isi formulir di bawah ini untuk menambahkan Artikel desa baru.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <ScrollArea className="pr-3 sm:max-w-[1200px] h-[410px]">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <div className="grid lg:grid-cols-3 grid-cols-1 gap-4 mx-2">
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="judul"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Judul Artikel</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Masukkan judul artikel"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Judul artikel yang akan dipublikasikan.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="slug"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Slug</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Masukkan slug artikel"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Slug untuk URL artikel (contoh: judul-artikel-ini).
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="kategori"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Kategori</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Pilih kategori artikel" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Berita">Berita</SelectItem>
                            <SelectItem value="Pengumuman">
                              Pengumuman
                            </SelectItem>
                            <SelectItem value="Kegiatan">Kegiatan</SelectItem>
                            <SelectItem value="Informasi">Informasi</SelectItem>
                            {/* Tambahkan kategori lain sesuai kebutuhan */}
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          Pilih kategori yang sesuai untuk artikel ini.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="tanggal"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Tanggal Artikel</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-[240px] pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pilih tanggal</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date > new Date() ||
                                date < new Date("2000-01-01")
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormDescription>
                          Tanggal publikasi artikel.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Pilih status artikel" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Draft">Draft</SelectItem>
                            <SelectItem value="Publikasi">Publikasi</SelectItem>
                            <SelectItem value="Arsip">Arsip</SelectItem>
                          </SelectContent>
                        </Select>

                        <FormDescription>
                          Status publikasi artikel.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="urlArtikel"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>URL Artikel</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="https://example.com/artikel-saya"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          URL khusus untuk artikel ini (opsional). Biarkan
                          kosong untuk menggunakan URL default.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="ringkasan"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ringkasan</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tulis ringkasan artikel di sini"
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Ringkasan singkat dari isi artikel.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="isi"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Isi Artikel</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tulis isi artikel di sini"
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Isi lengkap dari artikel.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              {loading ? (
                <Button className="w-full mt-5" type="submit" disabled>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Loading
                </Button>
              ) : (
                <Button type="submit" className="w-full mt-5">
                  Buat
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
