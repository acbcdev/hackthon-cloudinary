import { Skeleton } from "@/components/ui/skeleton";

export default function loading() {
  return (
    <div>
      <Skeleton className="w-full h-52" />
      <div className="flex gap-x-2">
        <Skeleton className="w-32 h-10" />
        <Skeleton className="w-32 h-10" />
        <Skeleton className="w-32 h-10" />

      </div>

    </div>
  );
}