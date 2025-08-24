import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'

import { DeleteForm } from '@/app/blog/[slug]/delete/form'
import { Button } from '@/components/ui/button'

type DeleteBlogPageProps = {
  params: Promise<{ slug: string }>
}

export default async function DeleteBlogPageprops({ params }: DeleteBlogPageProps) {
  const { slug } = await params

  return (
    <div className="flex flex-col space-y-4">
      <Button className="self-start" variant="outline" size="sm" asChild>
        <Link href={`/blog/${slug}`}>
          <ChevronLeft />
          Back
        </Link>
      </Button>
      <DeleteForm id={slug} />
    </div>
  )
}
