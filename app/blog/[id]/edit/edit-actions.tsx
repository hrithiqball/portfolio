'use client'

import { RainbowButton } from '@/components/magicui/rainbow-button'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'

export function EditActions() {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <RainbowButton className='absolute bottom-0 right-0 z-[100] mr-4 mb-4'>
            Publish
          </RainbowButton>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Blog</DialogTitle>
            <DialogDescription>Update blog content with latest settings.</DialogDescription>
          </DialogHeader>
          other stuff input
          <DialogFooter>
            <DialogClose asChild>
              <Button variant='outline'>Cancel</Button>
            </DialogClose>
            <RainbowButton>Update</RainbowButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
