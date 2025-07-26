'use client'

import Giscus from '@giscus/react'

type CommentSectionProps = {
  slug: string
}

export function CommentSection({ slug }: CommentSectionProps) {
  return (
    <Giscus
      id="comments"
      repo="hrithiqball/portfolio"
      repoId="R_kgDOPQc_qA"
      category="General"
      categoryId="DIC_kwDOPQc_qM4CtRNR"
      mapping="pathname"
      term={slug}
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="bottom"
      theme="catppuccin_macchiato"
      lang="en"
      loading="lazy"
    />
  )
}
