import type { Metadata } from 'next'
import Link from 'next/link'

import { Meteors } from '@/components/magicui/meteors'
import { ParticleBackground } from '@/components/particle-background'

export const metadata: Metadata = {
  title: 'About Harith Iqbal',
  description:
    'Learn about Harith Iqbal, a full stack developer specializing in React, Node.js, and TypeScript.',
  alternates: {
    canonical: '/about'
  }
}

export default function AboutPage() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      <Meteors />
      <ParticleBackground />

      <div className="relative z-10 mx-auto w-full max-w-3xl space-y-6 py-8">
        <h1 className="text-3xl font-bold">About Harith Iqbal</h1>
        <p>
          I&apos;m Harith Iqbal, a full stack developer focused on building scalable and
          user-friendly web applications with React, Node.js, and TypeScript.
        </p>
        <p>
          I enjoy turning ideas into production-ready products, from planning and architecture to
          deployment and long-term maintenance.
        </p>
        <p>
          You can explore my recent work on the{' '}
          <Link href="/" className="underline underline-offset-4">
            homepage
          </Link>{' '}
          and read technical notes in my{' '}
          <Link href="/blog" className="underline underline-offset-4">
            blog
          </Link>
          .
        </p>
      </div>
    </main>
  )
}
