import { Skeleton } from "@/components/ui/skeleton";

export default function loading() {
  return (

    (<div className="h-screen  grid place-content-center  gap-y-10 mx-auto">
      <Skeleton className="w-[90%] mx-auto h-52" />
      <div className="flex w-[90%] gap-x-2 mx-auto">
        <Skeleton className="w-32 h-10" />
        <Skeleton className="w-32 h-10" />
        <Skeleton className="w-32 h-10" />
      </div>
    </div>)
  );
}