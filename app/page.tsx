import { Code } from 'lucide-react'

import { DownloadResume } from '@/components/download-resume'
import { BlurFade } from '@/components/magicui/blur-fade'
import { HyperText } from '@/components/magicui/hyper-text'
import { PixelImage } from '@/components/magicui/pixel-image'
import { AnimatedSpan, Terminal } from '@/components/magicui/terminal'
import { ParticleBackground } from '@/components/particle-background'
import { ProjectCard } from '@/components/project-card'
import { ResumeCard } from '@/components/resume-card'
import { Skills } from '@/components/skills'
import { DATA } from '@/data/resume'

const BLUR_FADE_DELAY = 0.04

export default function HomePage() {
  return (
    <main className='flex flex-col min-h-[100dvh] space-y-10'>
      <div className='sr-only'>
        <h1>Harith Iqbal - Full Stack Developer Portfolio</h1>
        <p>
          Welcome to Harith Iqbal's portfolio. I am a Full Stack Developer specializing in React,
          Node.js, TypeScript, and modern web technologies. I have experience in planning,
          designing, developing, testing, delivering, maintaining, and enhancing web applications.
        </p>
        <p>
          My expertise includes React, Angular, Node.js, .NET, PostgreSQL, MongoDB, Docker, and
          cloud technologies. I create scalable, performant web applications and have worked on
          various projects ranging from e-commerce platforms to data visualization tools.
        </p>
      </div>

      <div className='flex flex-col items-center justify-center min-h-screen'>
        <div className='relative overflow-hidden w-full pb-12'>
          <ParticleBackground />
          <div className='space-y-8'>
            <header className='relative z-10 text-center'>
              <HyperText>Harith Iqbal</HyperText>
            </header>

            <div className='flex justify-center'>
              <PixelImage src='/me.png' grayscaleAnimation />
            </div>

            <section id='about' className='relative z-10'>
              <Terminal className='mx-auto'>
                <AnimatedSpan delay={1000} className='text-green-600'>
                  {'>'} harith@debian-btw:~$ whoami
                </AnimatedSpan>
                <AnimatedSpan delay={1250}>
                  <div className='flex items-center gap-2'>
                    <Code className='size-4' />
                    <span>Full Stack Developer</span>
                  </div>
                </AnimatedSpan>
                <div className='pl-4'>
                  <AnimatedSpan delay={1750} className='text-blue-500'>
                    ✔ Planning
                  </AnimatedSpan>
                  <AnimatedSpan delay={2000} className='text-blue-500'>
                    ✔ Designing
                  </AnimatedSpan>
                  <AnimatedSpan delay={2250} className='text-blue-500'>
                    ✔ Developing
                  </AnimatedSpan>
                  <AnimatedSpan delay={2500} className='text-blue-500'>
                    ✔ Testing
                  </AnimatedSpan>
                  <AnimatedSpan delay={2750} className='text-blue-500'>
                    ✔ Delivering
                  </AnimatedSpan>
                  <AnimatedSpan delay={3000} className='text-blue-500'>
                    ✔ Maintaining
                  </AnimatedSpan>
                  <AnimatedSpan delay={3250} className='text-blue-500'>
                    ✔ Enhancing
                  </AnimatedSpan>
                </div>
                <AnimatedSpan delay={4000}>🔥 Blazingly Fast!</AnimatedSpan>
              </Terminal>
            </section>

            <section id='work'>
              <div className='flex min-h-0 flex-col gap-y-3'>
                <BlurFade delay={BLUR_FADE_DELAY * 5}>
                  <h2 className='text-xl font-bold'>Work Experience</h2>
                </BlurFade>
                {DATA.work.map((work, id) => (
                  <BlurFade key={work.company + work.title} delay={BLUR_FADE_DELAY * 6 + id * 0.05}>
                    <ResumeCard
                      key={work.company + work.title}
                      logoUrl={work.logoUrl}
                      altText={work.company}
                      title={work.company}
                      subtitle={work.title}
                      href={work.href}
                      badges={work.badges}
                      period={`${work.start} - ${work.end ?? 'Present'}`}
                      description={work.description}
                    />
                  </BlurFade>
                ))}
              </div>
            </section>

            <section id='education'>
              <div className='flex min-h-0 flex-col gap-y-3'>
                <BlurFade delay={BLUR_FADE_DELAY * 7}>
                  <h2 className='text-xl font-bold'>Education</h2>
                </BlurFade>
                {DATA.education.map((edu, id) => (
                  <BlurFade key={edu.school + edu.degree} delay={BLUR_FADE_DELAY * 8 + id * 0.05}>
                    <ResumeCard
                      key={edu.school}
                      logoUrl={edu.logoUrl}
                      altText={edu.school}
                      title={edu.school}
                      subtitle={edu.degree}
                      href={edu.href}
                      period={`${edu.start} - ${edu.end ?? 'Present'}`}
                    />
                  </BlurFade>
                ))}
              </div>
            </section>

            <section id='skills'>
              <div className='flex min-h-0 flex-col gap-y-3'>
                <BlurFade delay={BLUR_FADE_DELAY * 9}>
                  <h2 className='text-xl font-bold'>Skills</h2>
                </BlurFade>
                <BlurFade delay={BLUR_FADE_DELAY * 10}>
                  <div className='flex flex-wrap gap-2'>
                    <Skills />
                  </div>
                </BlurFade>
              </div>
            </section>

            <section id='projects'>
              <div className='flex min-h-0 flex-col gap-y-3'>
                <BlurFade delay={BLUR_FADE_DELAY * 11}>
                  <h2 className='text-xl font-bold'>Projects</h2>
                </BlurFade>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 items-stretch'>
                  {DATA.projects.map((project, id) => (
                    <BlurFade key={project.title} delay={BLUR_FADE_DELAY * 12 + id * 0.05}>
                      <ProjectCard project={project} />
                    </BlurFade>
                  ))}
                </div>
              </div>
            </section>

            <section id='resume' className='flex justify-center'>
              <DownloadResume />
            </section>
          </div>
        </div>
      </div>
    </main>
  )
}
