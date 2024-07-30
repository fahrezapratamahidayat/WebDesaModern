"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function GallerySection() {
  const [imageLink, setImageLink] = useState<string>("");
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const handleImageModal = (link: string) => {
    setImageLink(link);
    setDialogOpen(true);
  };
  return (
    <section
      id="galeri"
      className="scroll-mt-[2rem] flex flex-col lg:px-32 pb-20 px-4 min-h-screen gap-4 mt-96 lg:mt-0"
    >
      <h1 className="text-3xl font-bold tracking-tight">Galeri desa</h1>
      <div className="group flex lg:flex-row flex-col lg:items-center lg:px-1 py-6  lg:gap-0 gap-5">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <img
              className="h-full object-cover max-w-full rounded-lg"
              src="https://plus.unsplash.com/premium_photo-1689119164042-6573d012a7fe?q=80&w=1895&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
              onClick={() =>
                handleImageModal(
                  "https://plus.unsplash.com/premium_photo-1689119164042-6573d012a7fe?q=80&w=1895&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                )
              }
            />
          </div>
          <div>
            <img
              className="h-auto max-w-full rounded-lg"
              src="https://plus.unsplash.com/premium_photo-1694475577963-4197d19bae24?q=80&w=1734&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
              onClick={() =>
                handleImageModal(
                  "https://plus.unsplash.com/premium_photo-1694475577963-4197d19bae24?q=80&w=1734&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                )
              }
            />
          </div>
          <div>
            <img
              className="h-auto max-w-full rounded-lg"
              src="https://images.unsplash.com/photo-1523292562811-8fa7962a78c8?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
              onClick={() =>
                handleImageModal(
                  "https://images.unsplash.com/photo-1523292562811-8fa7962a78c8?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                )
              }
            />
          </div>
          <div>
            <img
              className="h-auto max-w-full rounded-lg"
              src="https://images.unsplash.com/photo-1536181783029-1097aaf179de?q=80&w=1744&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
              onClick={() =>
                handleImageModal(
                  "https://images.unsplash.com/photo-1536181783029-1097aaf179de?q=80&w=1744&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                )
              }
            />
          </div>
        </div>
      </div>
      <Dialog onOpenChange={setDialogOpen} open={dialogOpen}>
        <DialogContent className="p-0 bg-transparent border-none h-[500px] w-[800px] max-w-full">
          <div className="">
            <img
              src={imageLink}
              alt="testing"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
