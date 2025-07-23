import { Button } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { DeleteForm } from './form'

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  return (
    <div className='flex flex-col space-y-4'>
      <Button className='self-start' variant='outline' size='sm' asChild>
        <Link href={`/blog/${id}`}>
          <ChevronLeft />
          Back
        </Link>
      </Button>
      <DeleteForm id={id} />
    </div>
  )
}
