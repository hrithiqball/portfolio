import { ReactNode } from 'react'
import {
  GraduationCap,
  HardHat,
  HomeIcon,
  Moon,
  NotebookIcon,
  ProjectorIcon,
  Truck,
  Zap
} from 'lucide-react'

import { Icons } from '@/components/icons'

export type Project = {
  title: string
  image: string
  icon: ReactNode
  href: string
  dates: string
  active: boolean
  description: string
  technologies: (string | ReactNode)[]
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
      badges: [<Icons.react />, <Icons.nodejs />],
      location: 'Klang, Selangor',
      title: 'Software Developer',
      logoUrl: '/swift.png',
      start: 'June 2024',
      end: 'Present',
      description:
        'I played a key role in maintaining and evolving Swift Logistics’ internal transport and supply chain system—accessible via Swift Logistics’ portal and the ShipX-powered interface. This enterprise-grade platform supports creating transport requests, tracking prime mover locations, and managing end-to-end logistics workflows (e.g., haulage, forwarding, release-of-transport (ROT), billing)'
    },
    {
      company: 'Recogine Technology Sdn Bhd',
      href: 'https://recogine.com',
      badges: [<Icons.dotnet />, <Icons.angular />],
      location: 'Putra Heights, Selangor',
      title: 'Software Engineer',
      logoUrl: '/recogine.png',
      start: 'January 2023',
      end: 'June 2024',
      description:
        'Developed RecoZense line of products to improve quality of life in transportation system mainly in highway and railway. Worked on various software solutions across Malaysia, Thailand and Phillipines. Had fun with a lot of challenges using IoT such as speed radar, RFID reader and much more, in house machine learning, video analytics, and cloud computing. Automatic Number Plate Recognition, Vehicle Detection System, Weigh-in-Motion System, Variable Message Signs just to name a few.'
    },
    {
      company: 'Recogine Technology Sdn Bhd',
      href: 'https://recogine.com',
      badges: [<Icons.expo />],
      location: 'Putra Heights, Selangor',
      title: 'Application Development Intern',
      logoUrl: '/recogine.png',
      start: 'September 2022',
      end: 'December 2022',
      description:
        'Developed mobile applications using Expo framework. Gained hands-on experience in mobile app development and cross-platform development practices. First exposure of software development life cycle from planning to maintaining.'
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
      image: '',
      icon: <HardHat className="text-yellow-500" />,
      href: 'https://github.com/hrithiqball/e-jobpack',
      dates: 'Mar 2023 - July 2023',
      active: true,
      description:
        'An asset management system for managing company assets and handle maintenance for in house and third party vendors. Built for tracking the assets including offline checklist using excel and QR code scanning.',
      technologies: [
        <>
          <Icons.nextjs /> Next.js
        </>,
        <>
          <Icons.postgresql /> PostgreSQL
        </>,
        <>
          <Icons.prisma /> Prisma
        </>,
        <>
          <Icons.tailwindcss /> TailwindCSS
        </>,
        <>
          <Icons.docker /> Docker
        </>
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
      image: '',
      icon: <Zap className="text-blue-500" />,
      href: 'https://github.com/hrithiqball/ev-reservation',
      dates: 'May 2025 - July 2025',
      active: true,
      description:
        'An electric vehicle charging reservation system that allows users to reserve charging stations, view availability, and manage their reservations. Built with a focus on user experience and performance.',
      technologies: [
        <>
          <Icons.springboot /> Spring Boot
        </>,
        <>
          <Icons.vite /> Vite
        </>,
        <>
          <Icons.react /> React
        </>,
        <>
          <Icons.postgresql /> PostgreSQL
        </>,
        <>
          <Icons.tailwindcss /> TailwindCSS
        </>,
        <>
          <Icons.docker /> Docker
        </>
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
      image: '',
      icon: <Moon className="text-green-800" />,
      href: 'https://github.com/hrithiqball/mindful-muslim',
      dates: 'Feb 2025 - May 2025',
      active: true,
      description:
        'A cross platform mobile application that display daily prayer times, and allow users to track their prayers and set reminders. Extra features such as tracking prayers with a prayer buddy and analysis of prayer habits.',
      technologies: [
        <>
          <Icons.expo /> Expo
        </>,
        <>
          <Icons.firebase /> Firebase
        </>,
        <>
          <Icons.nativewind /> NativeWind
        </>
      ],
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
      technologies: [
        <>
          <Icons.laravel /> Laravel
        </>,
        <>
          <Icons.vite /> Vite
        </>,
        <>
          <Icons.vue /> Vue.js
        </>,
        <>
          <Icons.mysql /> MySQL
        </>,
        <>
          <Icons.tailwindcss /> TailwindCSS
        </>
      ],
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
      image: '',
      icon: <GraduationCap className="text-purple-500" />,
      href: 'https://github.com/hrithiqball/interntrack',
      dates: 'Oct 2024 - Jan 2025',
      active: true,
      description:
        'A digital internship management system that allows users to manage internship applications, track progress, and communicate with mentors. Built with a focus on user experience and performance.',
      technologies: [
        <>
          <Icons.springboot /> Spring Boot
        </>,
        <>
          <Icons.vite /> Vite
        </>,
        <>
          <Icons.react /> React
        </>,
        <>
          <Icons.oracle /> Oracle DB
        </>,
        <>
          <Icons.tailwindcss /> TailwindCSS
        </>
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
