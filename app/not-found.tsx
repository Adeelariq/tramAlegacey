import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-brand-black flex items-center justify-center px-6">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(184,115,51,0.5) 0%, transparent 60%)',
        }}
      />
      <div className="relative text-center max-w-lg">
        <p className="font-display text-[120px] md:text-[180px] font-bold copper-text leading-none opacity-20">404</p>
        <div className="-mt-8 md:-mt-16">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-brand-beige mb-4">Page Not Found</h1>
          <p className="font-body text-brand-beige/50 text-lg mb-10">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link href="/" className="btn-copper inline-flex items-center gap-3">
            Return Home <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  )
}
