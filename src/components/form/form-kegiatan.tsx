"use client";;
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Loader2, Plus } from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import axios from "axios";
import { useCurrentUser } from "@/hooks/use-current-user";
import { toast } from "sonner";

const formSchema = z.object({
  nama: z.string().min(2, {
    message: "Nama kegiatan harus memiliki minimal 2 karakter.",
  }),
  jenis: z.enum(["Lingkungan", "Pendidikan", "Budaya"]),
  tanggal: z.date({
    required_error: "Tanggal kegiatan diperlukan.",
  }),
  waktu: z.string(),
  lokasi: z.string(),
});

export function KegiatanDesaForm() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const user = useCurrentUser();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nama: "",
      jenis: "Lingkungan",
      waktu: "",
      lokasi: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      const response = await axios.post("/api/kegiatan", {
        ...values,
        postedBy: user?.nama,
        penulisId: user?.id,
      });
      toast.success('kegiatan berhasil dibuat')
      form.reset()
      setOpen(false)
    } catch (error) {
      toast.success(`kegiatan gagal dibuat`)
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className="">
          <Plus className="mr-2 h-4 w-4" /> Tambah Kegiatan Desa
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tambah Kegiatan Desa</DialogTitle>
          <DialogDescription>
            Isi formulir di bawah ini untuk menambahkan kegiatan desa baru.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="nama"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Kegiatan</FormLabel>
                  <FormControl>
                    <Input placeholder="Masukkan nama kegiatan" {...field} />
                  </FormControl>
                  <FormDescription>
                    Nama kegiatan yang akan dilaksanakan.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="jenis"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Jenis Kegiatan</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih jenis kegiatan" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Lingkungan">Lingkungan</SelectItem>
                      <SelectItem value="Pendidikan">Pendidikan</SelectItem>
                      <SelectItem value="Budaya">Budaya</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Jenis kegiatan yang akan dilaksanakan.
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
                  <FormLabel>Tanggal Kegiatan</FormLabel>
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
                          date < new Date() || date > new Date("2100-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    Tanggal pelaksanaan kegiatan.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="waktu"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Waktu Kegiatan</FormLabel>
                  <FormControl>
                    <Input type="time" {...field} />
                  </FormControl>
                  <FormDescription>Waktu pelaksanaan kegiatan.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lokasi"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lokasi Kegiatan</FormLabel>
                  <FormControl>
                    <Input placeholder="Masukkan lokasi kegiatan" {...field} />
                  </FormControl>
                  <FormDescription>
                    Lokasi pelaksanaan kegiatan.
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
