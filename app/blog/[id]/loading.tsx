import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <div className="flex justify-center">
      <div className="prose flex flex-col gap-y-2 w-full">
        <Skeleton className="h-12 w-44" />
        <Skeleton className="h-6 w-28" />
        <Skeleton className="h-2 w-full mt-4" />
        <Skeleton className="h-6 w-full my-8" />
        <Skeleton className="h-6 w-1/2" />
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-6 w-4/5" />
        <Skeleton className="h-6 w-4/5" />
        <Skeleton className="h-52 w-full my-4" />
        <Skeleton className="h-6 w-4/5" />
        <Skeleton className="h-6 w-4/5" />
      </div>
    </div>
  )
}
