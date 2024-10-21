'use client'
import { Skeleton } from "@/components/ui/skeleton"
import { useStore } from "@/lib/store";

export default function SkeletonInterface() {
  const { loading } = useStore();
  return (
    <div className="grid gap-2 ">
      {loading.text && <div className="w-full h-52 p-4 space-y-3" >
        <Skeleton className="w-full h-10" />
        <Skeleton className="w-[70%] h-10" />
        <Skeleton className="w-[80%] h-10" />
      </div>}
      {loading.img && <Skeleton className="aspect-square h-60 w-full" />}
      {loading.options && <div className="flex gap-x-2 p-4">
        <Skeleton className="w-32 h-10" />
        <Skeleton className="w-32 h-10" />
        <Skeleton className="w-32 h-10" />

      </div>}
    </div>
  );
}