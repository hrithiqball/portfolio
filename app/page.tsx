import { Code } from 'lucide-react'

import { DownloadResume } from '@/components/download-resume'
import { BlurFade } from '@/components/magicui/blur-fade'
import { HyperText } from '@/components/magicui/hyper-text'
import { PixelImage } from '@/components/magicui/pixel-image'
import { AnimatedSpan, Terminal } from '@/components/magicui/terminal'
import { ParticleBackground } from '@/components/particle-background'
import { ProjectCard } from '@/components/project-card'
import { ResumeCard } from '@/components/resume-card'
import { DATA } from '@/data/resume'

const BLUR_FADE_DELAY = 0.04

export default function Home() {
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
                    <img
                      alt='React'
                      src='https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB'
                    />
                    <img
                      alt='Expo'
                      src='https://img.shields.io/badge/Expo-1B1F23?style=for-the-badge&logo=expo&logoColor=white'
                    />
                    <img
                      alt='Angular'
                      src='https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white'
                    />
                    <img
                      alt='shadcn/ui'
                      src='https://img.shields.io/badge/shadcn%2Fui-000000?style=for-the-badge&logo=shadcnui&logoColor=white'
                    />
                    <img
                      alt='Tailwind CSS'
                      src='https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white'
                    />
                    <img
                      alt='Node.js'
                      src='https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white'
                    />
                    <img
                      alt='.NET'
                      src='https://img.shields.io/badge/.NET-512BD4?style=for-the-badge&logo=dotnet&logoColor=white'
                    />
                    <img
                      alt='Elastic'
                      src='https://img.shields.io/badge/Elastic-005571?style=for-the-badge&logo=elastic&logoColor=white'
                    />
                    <img
                      alt='GraphQL'
                      src='https://img.shields.io/badge/GraphQl-E10098?style=for-the-badge&logo=graphql&logoColor=white'
                    />
                    <img
                      alt='JWT'
                      src='https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white'
                    />
                    <img
                      alt='Prisma'
                      src='https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white'
                    />
                    <img
                      alt='PostgreSQL'
                      src='https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white'
                    />
                    <img
                      alt='MongoDB'
                      src='https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white'
                    />
                    <img
                      alt='MSSQL'
                      src='https://img.shields.io/badge/MSSQL-CC2927?style=for-the-badge&logo=databricks&logoColor=white'
                    />
                    <img
                      alt='MySQL'
                      src='https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white'
                    />
                    <img
                      alt='Redis'
                      src='https://img.shields.io/badge/redis-CC0000.svg?&style=for-the-badge&logo=redis&logoColor=white'
                    />
                    <img
                      alt='Docker'
                      src='https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white'
                    />
                    <img
                      alt='IIS'
                      src='https://img.shields.io/badge/IIS-CC2927?style=for-the-badge&logo=databricks&logoColor=white'
                    />
                    <img
                      alt='Nginx'
                      src='https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=nginx&logoColor=white'
                    />
                    <img
                      alt='Google Cloud'
                      src='https://img.shields.io/badge/Google_Cloud-4285F4?style=for-the-badge&logo=google-cloud&logoColor=white'
                    />
                    <img
                      alt='Cloudflare'
                      src='https://img.shields.io/badge/Cloudflare-000000?style=for-the-badge&logo=Cloudflare&logoColor=orange'
                    />
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
