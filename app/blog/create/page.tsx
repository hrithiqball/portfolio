'use client'

import { createPostAction } from '@/app/blog/create/actions'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useRouter } from 'next/navigation'
import { useActionState, useEffect } from 'react'
import { toast } from 'sonner'

export default function CreateBlogPage() {
  const router = useRouter()
  const [state, formAction] = useActionState(createPostAction, { success: undefined })

  useEffect(() => {
    if (state.success === true) {
      toast.success(state.message || 'Upload successful!')
      setTimeout(() => {
        router.push('/blog')
      }, 1500)
    }

    if (state.success === false && state.error) {
      toast.error('Upload failed. Please try again.', {
        description: state.error
      })
    }
  }, [state, router])

  return (
    <div className='items-center flex justify-center py-12'>
      <Card className='p-4 space-y-4 bg-stone-50 dark:bg-card'>
        <CardHeader>
          <CardTitle>Upload New Blog</CardTitle>
        </CardHeader>
        <CardContent>
          <form id='blog-form' action={formAction} className='space-y-2'>
            <Label htmlFor='token'>Token</Label>
            <Input name='token' placeholder='ragebaited' />
            <Label htmlFor='title'>Title</Label>
            <Input name='title' placeholder='My New Blog Post' required />
            <Label htmlFor='description'>Description</Label>
            <Input name='description' placeholder='A brief description of the post' required />
            <Label htmlFor='category'>Category</Label>
            <Input name='category' placeholder='e.g., Technology, Lifestyle' required />
            <Label htmlFor='tags'>Tags</Label>
            <Input name='tags' placeholder='Comma-separated tags' required />
            <Label htmlFor='file'>File</Label>
            <Input name='file' type='file' required />
          </form>
        </CardContent>
        <CardFooter className='flex justify-end'>
          <Button form='blog-form' type='submit'>
            Upload
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
