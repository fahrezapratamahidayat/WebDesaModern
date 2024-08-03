import Image from "next/image";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { EmptyCard } from "../ui/empty-card";

export function UploadedFilesCard({ uploadedFiles }: any) {
  return (
    <>
      {uploadedFiles.length > 0 ? (
        <ScrollArea className="pb-4">
          <div className="flex w-max space-x-2.5">
            {uploadedFiles.map((file: any) => (
              <div key={file.key} className="relative aspect-video w-64">
                <Image
                  src={file.url}
                  alt={file.name}
                  fill
                  sizes="(min-width: 640px) 640px, 100vw"
                  loading="lazy"
                  className="rounded-md object-cover"
                />
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      ) : (
        <p></p>
      )}
    </>
  );
}
