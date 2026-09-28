'use client'

import Link from 'next/link'
// import { useRouter } from 'next/navigation'
import { ArrowRight, Sparkles } from 'lucide-react'

export default function FeaturedHotelsHeader() {
//   const router = useRouter()

  return (
    <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
      <div>
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-[#4E604F]" />
          <h2 className="font-heading text-3xl font-bold text-[#1B1C1C] md:text-4xl lg:text-5xl">
            Featured Hotels
          </h2>
        </div>
        <p className="mt-1 font-sans text-sm text-[#434842]/70 md:text-base">
          Handpicked properties for an exquisite experience.
        </p>
      </div>
      
      <Link
        href="/explore"
        className="group inline-flex items-center gap-2 rounded-full bg-[#4E604F]/10 px-5 py-2.5 text-sm font-medium text-[#4E604F] transition-all hover:bg-[#4E604F] hover:text-white md:text-base"
      >
        <span>View All</span>
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </Link>
    </div>
  )
}