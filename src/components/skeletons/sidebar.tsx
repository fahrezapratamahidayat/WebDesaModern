"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function SidebarSkeleton() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <aside
      className={` ${isSidebarOpen ? "w-64" : "w-20"} transition-all duration-300 ease-in-out`}
    >
      <ScrollArea className="h-full">
        <div className="p-4">
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? (
              <ArrowRight className="h-5 w-5" />
            ) : (
              <ArrowLeft className="h-5 w-5" />
            )}
          </Button>
        </div>
        <nav className="space-y-1 p-4 flex flex-col">
          {[...Array(3)].map((_, index) => (
            <Skeleton
              key={index}
              className={`h-10 ${isSidebarOpen ? "w-full" : "w-12"}`}
            />
          ))}
        </nav>
        <div className="p-4 mt-auto">
          <Skeleton className={`h-10 ${isSidebarOpen ? "w-full" : "w-12"}`} />
        </div>
      </ScrollArea>
    </aside>
  );
}
