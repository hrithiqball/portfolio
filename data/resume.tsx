import { ReactNode } from 'react'
import { HomeIcon, NotebookIcon, ProjectorIcon, Truck } from 'lucide-react'

import { Icons } from '@/components/icons'

export type Project = {
  title: string
  image: string
  icon: ReactNode
  href: string
  dates: string
  active: boolean
  description: string
  technologies: string[]
  links: { type: string; href: string; icon: ReactNode }[]
}

export const DATA = {
  navbar: [
    { href: '/', icon: HomeIcon, label: 'Home' },
    { href: '/blog', icon: NotebookIcon, label: 'Blog' }
  ],
  contact: {
    social: {
      GitHub: {
        name: 'GitHub',
        url: 'https://github.com/hrithiqball',
        icon: Icons.github,

        navbar: true
      },
      LinkedIn: {
        name: 'LinkedIn',
        url: 'https://www.linkedin.com/in/hrithiqball/',
        icon: Icons.linkedin,

        navbar: true
      },
      email: {
        name: 'Send Email',
        url: 'mailto:hrithiqball@gmail.com',
        icon: Icons.email,

        navbar: true
      }
    }
  },

  work: [
    {
      company: 'Swift Haulage Berhad',
      href: 'https://swiftlogistics.com.my/',
      badges: [],
      location: 'Klang, Selangor',
      title: 'Software Developer',
      logoUrl: '/swift.png',
      start: 'June 2024',
      end: 'Present',
      description:
        'Implemented the Bitcoin discreet log contract (DLC) protocol specifications as an open source Typescript SDK. Dockerized all microservices and setup production kubernetes cluster. Architected a data lake using AWS S3 and Athena for historical backtesting of bitcoin trading strategies. Built a mobile app using react native and typescript.'
    },
    {
      company: 'Recogine Technology Sdn Bhd',
      href: 'https://recogine.com',
      badges: [],
      location: 'Putra Heights, Selangor',
      title: 'Software Engineer',
      logoUrl: '/recogine.jpg',
      start: 'January 2023',
      end: 'June 2024',
      description:
        'Developed a real-time data processing pipeline using Apache Kafka and Apache Flink for a large scale IoT project. Implemented a microservices architecture using Docker and Kubernetes. Built a web application using React and Node.js for data visualization and analytics.'
    },
    {
      company: 'Recogine Technology Sdn Bhd',
      href: 'https://recogine.com',
      badges: [],
      location: 'Putra Heights, Selangor',
      title: 'Application Development Intern',
      logoUrl: '/recogine.jpg',
      start: 'September 2022',
      end: 'December 2022',
      description:
        'Developed mobile applications using Expo framework. Gained hands-on experience in mobile app development and cross-platform development practices.'
    }
  ],
  education: [
    {
      school: 'University Technology MARA',
      href: 'https://uitm.edu.my',
      degree: "Bachelor's Degree of Computer Science (Hons.)",
      logoUrl: '/uitm.png',
      start: '2023',
      end: 'Present'
    },
    {
      school: 'University Technology MARA',
      href: 'https://uitm.edu.my',
      degree: 'Diploma in Computer Science',
      logoUrl: '/uitm.png',
      start: '2020',
      end: '2023'
    }
  ],
  projects: [
    {
      title: 'E-Jobpack',
      image: '/projects/ejobpack.ico',
      icon: <ProjectorIcon />,
      href: 'https://github.com/hrithiqball/e-jobpack',
      dates: 'Mar 2023 - July 2023',
      active: true,
      description:
        'An asset management system for managing company assets and handle maintenance for in house and third party vendors. Built for tracking the assets including offline checklist using excel and QR code scanning.',
      technologies: [
        'Next.js',
        'Typescript',
        'PostgreSQL',
        'Prisma',
        'TailwindCSS',
        'Shadcn UI',
        'Docker'
      ],
      links: [
        {
          type: 'Github Repository',
          href: 'https://github.com/hrithiqball/e-jobpack',
          icon: <Icons.github className="size-3" />
        },
        {
          type: 'Live Demo',
          href: 'https://e-jobpack-app.vercel.app/',
          icon: <Icons.globe className="size-3" />
        }
      ]
    },
    {
      title: 'EV Charging Reservation System',
      image: '/projects/ev.svg',
      icon: <ProjectorIcon />,
      href: 'https://github.com/hrithiqball/ev-reservation',
      dates: 'May 2025 - July 2025',
      active: true,
      description:
        'An electric vehicle charging reservation system that allows users to reserve charging stations, view availability, and manage their reservations. Built with a focus on user experience and performance.',
      technologies: [
        'Spring Boot',
        'Vite',
        'React',
        'Typescript',
        'PostgreSQL',
        'TailwindCSS',
        'Shadcn UI',
        'Docker'
      ],
      links: [
        {
          type: 'Github Repository',
          href: 'https://github.com/hrithiqball/ev-reservation',
          icon: <Icons.github className="size-3" />
        },
        {
          type: 'Live Demo',
          href: 'https://ev-reservation.pixcel.org/',
          icon: <Icons.globe className="size-3" />
        }
      ]
    },
    {
      title: 'Mindful Muslim',
      image: '/projects/mindful.png',
      icon: <ProjectorIcon />,
      href: 'https://github.com/hrithiqball/mindful-muslim',
      dates: 'Feb 2025 - May 2025',
      active: true,
      description:
        'A mobile application that display daily prayer times, and allow users to track their prayers and set reminders. Extra features such as tracking prayers with a prayer buddy and analysis of prayer habits.',
      technologies: ['Expo', 'Firebase', 'Typescript', 'Nativewind'],
      links: [
        // {
        //   type: 'Github Repository',
        //   href: 'https://github.com/hrithiqball/mindful-muslim',
        //   icon: <Icons.github className='size-3' />
        // }
      ]
    },
    {
      title: 'Transtrack System',
      image: '',
      icon: <Truck className="text-teal-500" />,
      href: 'https://github.com/hrithiqball/transtrack-system',
      dates: 'June 2024 - Oct 2024',
      active: true,
      description:
        'A booking system for managing transportation services. It allows users to book transportation services, view availability, and manage their bookings.',
      technologies: ['Laravel', 'Vite', 'Vue', 'Typescript', 'MySQL', 'TailwindCSS', 'Shadcn UI'],
      links: [
        {
          type: 'Github Repository',
          href: 'https://github.com/hrithiqball/transtrack-system',
          icon: <Icons.github className="size-3" />
        }
      ]
    },
    {
      title: 'Interntrack System',
      image: '/projects/intern.png',
      icon: <Truck />,
      href: 'https://github.com/hrithiqball/interntrack',
      dates: 'Oct 2024 - Jan 2025',
      active: true,
      description:
        'A digital internship management system that allows users to manage internship applications, track progress, and communicate with mentors. Built with a focus on user experience and performance.',
      technologies: [
        'Spring Boot',
        'Vite',
        'React',
        'Typescript',
        'Oracle DB',
        'TailwindCSS',
        'TipTap'
      ],
      links: [
        {
          type: 'Github Repository',
          href: 'https://github.com/hrithiqball/interntrack',
          icon: <Icons.github className="size-3" />
        }
      ]
    }
  ]
}
