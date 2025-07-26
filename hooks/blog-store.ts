import { create } from 'zustand'

interface BlogStore {
  markdown: string
  setMarkdown: (markdown: string) => void
}

export const useBlogStore = create<BlogStore>(set => ({
  markdown: '',
  setMarkdown: markdown => set({ markdown })
}))
