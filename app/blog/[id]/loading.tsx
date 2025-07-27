import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <div className="flex justify-center">
      <div className="prose flex w-full flex-col gap-y-2">
        <Skeleton className="h-12 w-44" />
        <Skeleton className="h-6 w-28" />
        <Skeleton className="mt-4 h-2 w-full" />
        <Skeleton className="my-8 h-6 w-full" />
        <Skeleton className="h-6 w-1/2" />
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-6 w-4/5" />
        <Skeleton className="h-6 w-4/5" />
        <Skeleton className="my-4 h-52 w-full" />
        <Skeleton className="h-6 w-4/5" />
        <Skeleton className="h-6 w-4/5" />
      </div>
    </div>
  )
}
