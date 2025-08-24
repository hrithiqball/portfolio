'use client'

import { useRouter } from 'next/navigation'
import { useActionState, useEffect } from 'react'
import { toast } from 'sonner'

import { DeleteActionState, deletePostAction } from '@/app/blog/[slug]/delete/actions'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

type DeleteFormProps = {
  slug: string
}

export function DeleteForm({ slug }: DeleteFormProps) {
  const router = useRouter()
  const [state, formAction, isPending] = useActionState<DeleteActionState, FormData>(
    deletePostAction.bind(null, slug),
    {}
  )

  useEffect(() => {
    if (state.success) {
      router.push('/blog')
      toast.success(state.message || 'Post deleted successfully!')
    } else {
      if (state.error) {
        toast.error(state.error)
      }
    }
  }, [state.success])

  return (
    <Card className="space-y-4 p-4">
      <CardHeader className="space-y-3">
        <CardTitle>Delete Confirmation</CardTitle>
        <CardDescription>
          Are you sure you want to delete this blog post? This action cannot be undone.
        </CardDescription>
      </CardHeader>
      <form action={formAction}>
        <CardContent>
          <Label htmlFor="token" className="mb-2 block">
            Delete Token
          </Label>
          <Input
            id="token"
            name="token"
            placeholder="guess the token"
            required
            disabled={isPending}
          />
        </CardContent>
        <CardFooter>
          <Button type="submit" variant="destructive" className="w-full" disabled={isPending}>
            {isPending ? 'Deleting...' : 'Delete'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
