import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import Navbar from '@/components/navbar'
import { TooltipProvider } from '@/components/ui/tooltip'
import { ReactNode } from 'react'
import { Toaster } from '@/components/ui/sonner'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'Harith Iqbal - Full Stack Developer | React, Node.js, TypeScript Expert',
  description:
    'Harith Iqbal - Full Stack Developer specializing in React, Node.js, and modern web technologies. Experienced in planning, designing, developing, testing, delivering, maintaining, and enhancing web applications. Portfolio showcasing innovative projects and technical expertise.',
  keywords: [
    'Harith Iqbal',
    'Full Stack Developer',
    'React Developer',
    'Node.js Developer',
    'TypeScript',
    'JavaScript',
    'Web Developer',
    'Software Engineer',
    'Frontend Developer',
    'Backend Developer',
    'Portfolio',
    'Next.js',
    'Tailwind CSS',
    'PostgreSQL',
    'MongoDB'
  ],
  authors: [{ name: 'Harith Iqbal' }],
  creator: 'Harith Iqbal',
  publisher: 'Harith Iqbal',
  metadataBase: new URL('https://hrithiqball.pixcel.org'),
  alternates: {
    canonical: '/'
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://hrithiqball.pixcel.org',
    title: 'Harith Iqbal - Full Stack Developer Portfolio',
    description:
      'Harith Iqbal - Full Stack Developer specializing in React, Node.js, and modern web technologies. View my portfolio and projects.',
    siteName: 'Harith Iqbal Portfolio',
    images: [
      {
        url: '/me.png',
        width: 1200,
        height: 630,
        alt: 'Harith Iqbal - Full Stack Developer'
      }
    ]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  }
}

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Harith Iqbal',
    jobTitle: 'Full Stack Developer',
    description: 'Full Stack Developer specializing in React, Node.js, and modern web technologies',
    url: 'https://hrithiqball.pixcel.org',
    sameAs: ['https://github.com/hrithiqball', 'https://linkedin.com/in/harithiqbal'],
    knowsAbout: [
      'React',
      'Node.js',
      'TypeScript',
      'JavaScript',
      'Next.js',
      'Tailwind CSS',
      'PostgreSQL',
      'MongoDB',
      'Full Stack Development',
      'Web Development',
      'Software Engineering'
    ],
    alumniOf: 'UiTM',
    worksFor: {
      '@type': 'Organization',
      name: 'Freelance'
    }
  }

  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-background font-sans antialiased container mx-auto pt-4 pb-24 px-6`}
      >
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider delayDuration={0}>
            <Toaster richColors />
            {children}
            <Navbar />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
