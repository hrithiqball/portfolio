import type { Metadata } from 'next'

import { Meteors } from '@/components/magicui/meteors'
import { ParticleBackground } from '@/components/particle-background'

export const metadata: Metadata = {
  title: 'Contact Harith Iqbal',
  description:
    'Get in touch with Harith Iqbal for full stack development opportunities and collaborations.',
  alternates: {
    canonical: '/contact'
  }
}

export default function ContactPage() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      <Meteors />
      <ParticleBackground />

      <div className="relative z-10 mx-auto w-full max-w-3xl space-y-6 py-8">
        <h1 className="text-3xl font-bold">Contact Harith Iqbal</h1>
        <p>
          I&apos;m open to full stack development roles, freelance projects, and technical
          collaborations.
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            Email:{' '}
            <a href="mailto:hrithiqball@gmail.com" className="underline underline-offset-4">
              hrithiqball@gmail.com
            </a>
          </li>
          <li>
            LinkedIn:{' '}
            <a
              href="https://www.linkedin.com/in/hrithiqball/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4"
            >
              linkedin.com/in/hrithiqball
            </a>
          </li>
          <li>
            GitHub:{' '}
            <a
              href="https://github.com/hrithiqball"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4"
            >
              github.com/hrithiqball
            </a>
          </li>
        </ul>
      </div>
    </main>
  )
}
