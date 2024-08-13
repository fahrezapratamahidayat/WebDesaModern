import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useUMKMStore } from "@/hooks/use-umkm-store";
import { TrashIcon, XCircleIcon, CheckCircleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import sonner, { toast } from "sonner";

export default function FormDelete() {
  const { isDialogOpen, formMode, closeDialog, deletingUMKM } = useUMKMStore();

  function handleDelete() {
    if (deletingUMKM?.id) {
      toast.promise(
        axios.delete(
          `${process.env.NEXT_PUBLIC_API_URL}/umkm?id=${deletingUMKM.id}`
        ),
        {
          loading: "Deleting UMKM...",
          success: (data) => {
            closeDialog();
            return `${deletingUMKM.nama || "UMKM"} berhasil dihapus`;
          },
          error: "Gagal menghapus UMKM",
        }
      );
    }
  }
  return (
    <AlertDialog
      open={formMode === "delete" && isDialogOpen}
      onOpenChange={closeDialog}
    >
      <AlertDialogContent className="sm:max-w-[500px]">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center justify-center flex-col gap-2">
            <TrashIcon className="h-6 w-6 text-destructive" />
            <span className="text-lg font-semibold">
              Apakah anda yakin ingin menghapus data ini ?
            </span>
          </AlertDialogTitle>
          <AlertDialogDescription className="text-sm ">
            Apakah anda yakin ingin menghapus data ini ?
            <span className="font-semibold">
              {" "}
              &quot;{deletingUMKM?.nama}&quot;{" "}
            </span>
            Aksi ini tidak dapat dikembalikan.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex items-center justify-center gap-2">
          <AlertDialogCancel asChild>
            <Button
              variant="outline"
              className="text-white w-full flex items-center justify-center gap-2"
            >
              <XCircleIcon className="h-4 w-4" />
              Tidak Simpan
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              variant="destructive"
              className="text-white w-full items-center justify-center gap-2"
              onClick={handleDelete}
            >
              <CheckCircleIcon className="h-4 w-4" />
              Ya, Hapus
            </Button>
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
