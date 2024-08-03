"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableHeader,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

export default function TableArtikelSkeleton() {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>
            <Skeleton className="h-6 w-32" />
          </CardTitle>
          <Skeleton className="h-4 w-64" />
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 pb-4 lg:flex-row lg:items-center">
            <Skeleton className="h-10 w-64" />
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-32" />
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                {[1, 2, 3, 4, 5].map((i) => (
                  <TableHead key={i}>
                    <Skeleton className="h-4 w-20" />
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {[1, 2, 3, 4, 5].map((row) => (
                <TableRow key={row}>
                  {[1, 2, 3, 4, 5].map((cell) => (
                    <TableCell key={cell}>
                      <Skeleton className="h-4 w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <div className="flex justify-end items-center py-4 space-x-2">
        <div className="flex-1">
          <Skeleton className="h-4 w-48" />
        </div>
        <div className="space-x-2">
          <Skeleton className="h-9 w-20 inline-block" />
          <Skeleton className="h-9 w-20 inline-block" />
        </div>
      </div>
    </>
  );
}
