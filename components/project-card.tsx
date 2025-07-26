'use client'

import Image from 'next/image'
import Link from 'next/link'

import { Project } from '@/data/resume'
import { Badge } from './ui/badge'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'

type ProjectCardProps = {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="flex h-full flex-col space-y-2 p-4">
      <CardHeader className="space-y-2">
        <CardTitle className="flex items-center gap-2">
          {project.image !== '' ? (
            <Image
              src={project.image}
              alt={project.title}
              width={24}
              height={24}
              className="size-6 h-auto rounded-full dark:bg-white"
            />
          ) : (
            project.icon
          )}
          <span>{project.title}</span>
        </CardTitle>
        <CardDescription>{project.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        {project.technologies.map((tech, i) => (
          <Badge variant="outline" key={i} className="mr-2 mb-2">
            {tech}
          </Badge>
        ))}
      </CardContent>
      <CardFooter className="mt-auto">
        {project.links && project.links.length > 0 && (
          <div className="flex flex-row flex-wrap items-start gap-1">
            {project.links?.map((link, idx) => (
              <Link href={link?.href} key={idx} target="_blank">
                <Badge key={idx} className="flex gap-2 px-2 py-1 text-[10px]">
                  {link.icon}
                  {link.type}
                </Badge>
              </Link>
            ))}
          </div>
        )}
      </CardFooter>
    </Card>
  )
}
