import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { TrashIcon, XCircleIcon, CheckCircleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "sonner";

interface FormDeleteProps {
  isOpen: boolean;
  onClose: () => void;
  itemToDelete: {
    id: string | number;
    name: string;
  };
  entityName: string;
  apiEndpoint: string;
}

export default function FormDelete({
  isOpen,
  onClose,
  itemToDelete,
  entityName,
  apiEndpoint,
}: FormDeleteProps) {
  function handleDelete() {
    if (itemToDelete?.id) {
      toast.promise(
        axios.delete(
          `${process.env.NEXT_PUBLIC_API_URL}${apiEndpoint}?id=${itemToDelete.id}`
        ),
        {
          loading: `Deleting ${entityName}...`,
          success: () => {
            onClose();
            return `${itemToDelete.name || entityName} berhasil dihapus`;
          },
          error: `Gagal menghapus ${entityName}`,
        }
      );
    }
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
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
              &quot;{itemToDelete?.name}&quot;{" "}
            </span>
            Aksi ini tidak dapat dikembalikan.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex items-center justify-center gap-2">
          <AlertDialogCancel asChild>
            <Button
              variant="outline"
              className="w-full flex items-center justify-center gap-2"
            >
              <XCircleIcon className="h-4 w-4" />
              Tidak Simpan
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              variant="destructive"
              className="w-full items-center justify-center gap-2"
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
