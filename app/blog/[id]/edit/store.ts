import { create } from 'zustand'

interface BlogEditStore {
  markdown: string
  setMarkdown: (markdown: string) => void
}

export const useBlogEditStore = create<BlogEditStore>(set => ({
  markdown: '',
  setMarkdown: markdown => set({ markdown })
}))
