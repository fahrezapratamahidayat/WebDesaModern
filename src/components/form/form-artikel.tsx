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

const formSchema = z.object({
  judul: z.string().min(2, {
    message: "Judul artikel harus memiliki minimal 2 karakter.",
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
});

export function ArticleDesaForm() {
  const [open, setOpen] = useState(false);
  const { data: session }: { data: any } = useSession();
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      judul: "",
      kategori: "",
      ringkasan: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      const payload = {
        judul: values.judul,
        kategori: values.kategori,
        tanggal: new Date(values.tanggal),
        ringkasan: values.ringkasan,
        penulis: parseInt(session.user.id),
      };

      const response = await axios.post("/api/artikel", payload);
      setLoading(false);
      form.reset();
      toast.success("artikel berhasil dibuat");
      setOpen(false);
    } catch (error) {
      setLoading(false);
      console.error("Error:", error);
      toast.error("artikel gagal dibuat");
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
      <DialogContent className="sm:max-w[650px]">
        <DialogHeader>
          <DialogTitle>Tambah Artikel Desa</DialogTitle>
          <DialogDescription>
            Isi formulir di bawah ini untuk menambahkan Artikel desa baru.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="judul"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Judul Artikel</FormLabel>
                  <FormControl>
                    <Input placeholder="Masukkan judul artikel" {...field} />
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
              name="kategori"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kategori</FormLabel>
                  <FormControl>
                    <Input placeholder="Masukkan kategori artikel" {...field} />
                  </FormControl>
                  <FormDescription>
                    Kategori artikel (misal: Berita, Pengumuman, dll).
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
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
                          date > new Date() || date < new Date("2000-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>Tanggal publikasi artikel.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
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
            {loading ? (
              <Button className="w-full" type="submit" disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading
              </Button>
            ) : (
              <Button type="submit" className="w-full">
                Buat
              </Button>
            )}
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
