import Image from "next/image";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import { toast } from "sonner";

interface UploadedFilesCardProps {
  uploadedFiles: Array<{
    id: string;
    key: string;
    blob: Buffer;
    keterangan: string | null;
  }>;
  onDelete: (key: string) => void;
}

export function UploadedFilesCard({ uploadedFiles, onDelete }: UploadedFilesCardProps) {
  const handleDelete = (key: string) => {
    if (uploadedFiles.length <= 1) {
      toast.error("Minimal harus ada satu gambar.");
      return;
    }
    onDelete(key);
  };

  return (
    <>
      {uploadedFiles.length > 0 ? (
        <ScrollArea className="pb-4">
          <div className="flex w-max space-x-2.5">
            {uploadedFiles.map((file) => (
              <div key={file.key} className="relative aspect-video w-64">
                <Image
                  src={`data:image/png;base64,${file.blob}`}
                  alt={file.keterangan || `Gambar ${file.key}`}
                  fill
                  sizes="(min-width: 640px) 640px, 100vw"
                  loading="lazy"
                  className="rounded-md object-cover"
                />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2"
                  onClick={() => handleDelete(file.key.toString())}
                  disabled={uploadedFiles.length <= 1}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      ) : (
        <p className="text-sm text-center text-muted-foreground">Tidak ada gambar yang diunggah</p>
      )}
    </>
  );
}