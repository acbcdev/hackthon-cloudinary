'use client'
import { Skeleton } from "@/components/ui/skeleton"
import { useStore } from "@/lib/store";

export default function SkeletonInterface() {
  const { loading } = useStore();
  return (
    <div className="grid mx-2 gap-2 ">
      {loading.text && <div className="w-full  px-2 py-1 space-y-3" >
        <Skeleton className="w-full h-10" />
        <Skeleton className="w-[70%] h-10" />
        <Skeleton className="w-[80%] h-10" />
      </div>}
      {loading.img && <Skeleton className="aspect-square mx-2 h-60 w-[80%]" />}
      {loading.options && <div className="flex gap-x-2 px-4 ">
        <Skeleton className="w-20  md:w-32 h-10" />
        <Skeleton className="w-20  md:w-32 h-10" />
        <Skeleton className="w-20  md:w-32 h-10" />
      </div>}
    </div>
  );
}