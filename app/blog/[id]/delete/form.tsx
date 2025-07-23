'use client'

import { useActionState, useEffect } from 'react'
import { DeleteActionState, deletePostAction } from './actions'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export function DeleteForm({ id }: { id: string }) {
  const router = useRouter()
  const [state, formAction, isPending] = useActionState<DeleteActionState, FormData>(
    deletePostAction.bind(null, id),
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
    <Card className='p-4 space-y-4'>
      <CardHeader className='space-y-3'>
        <CardTitle>Delete Confirmation</CardTitle>
        <CardDescription>
          Are you sure you want to delete this blog post? This action cannot be undone.
        </CardDescription>
      </CardHeader>
      <form action={formAction}>
        <CardContent>
          <Label htmlFor='token' className='block mb-2'>
            Delete Token
          </Label>
          <Input
            id='token'
            name='token'
            placeholder='guess the token'
            required
            disabled={isPending}
          />
        </CardContent>
        <CardFooter>
          <Button type='submit' variant='destructive' className='w-full' disabled={isPending}>
            {isPending ? 'Deleting...' : 'Delete'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
