import { MapPin, Phone, MessageCircle, Star, Camera } from 'lucide-react'
import MapEmbed from '@/components/MapEmbed'
import { Business, Review } from '@/types'
import { T } from '@/lib/i18n'

interface Props {
  business: Business
  photoRefs: string[]
  reviews: Review[]
  t: T
}

function photoUrl(ref: string) { return `/api/photo?ref=${ref}` }

const HEIGHTS = ['h-48', 'h-64', 'h-56', 'h-72', 'h-52']

export default function MasonryTheme({ business, photoRefs, reviews, t }: Props) {
  const city = [business.city, business.country === 'cl' ? 'Chile' : business.country].filter(Boolean).join(', ')
  const heroRef = photoRefs[0] ?? null
  const masonryRefs = photoRefs.slice(1)

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans">
      {/* Sticky nav */}
      <header className="sticky top-0 z-50 bg-zinc-950/80 backdrop-blur-md border-b border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
          <span className="text-lg font-black uppercase tracking-[0.2em] text-white">{business.name}</span>
          <nav className="hidden sm:flex items-center gap-8 text-xs font-semibold uppercase tracking-widest text-white/60">
            <a href="#galeria" className="hover:text-white transition-colors">{t.nav.gallery}</a>
            <a href="#resenas" className="hover:text-white transition-colors">{t.nav.reviews}</a>
            <a href="#contacto" className="hover:text-white transition-colors">{t.nav.contact}</a>
          </nav>
          <a href="#contacto" className="text-xs font-black uppercase tracking-widest border border-white px-4 py-2 hover:bg-white hover:text-zinc-950 transition-colors">
            {t.nav.book}
          </a>
        </div>
      </header>

      {/* Full-bleed hero */}
      <div className="relative h-screen overflow-hidden">
        {heroRef
          ? <img src={photoUrl(heroRef)} alt={business.name} className="absolute inset-0 w-full h-full object-cover scale-105 brightness-50" />
          : <div className="absolute inset-0 bg-zinc-800" />}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          {business.rating && (
            <div className="flex items-center gap-1.5 mb-6">
              {[1,2,3,4,5].map(n => (
                <Star key={n} className={`w-5 h-5 ${n <= Math.round(business.rating!) ? 'text-amber-400 fill-amber-400' : 'text-white/20 fill-white/20'}`} />
              ))}
              <span className="ml-2 text-white/60 text-sm">{business.rating.toFixed(1)} · {business.num_reviews} {t.labels.reviews}</span>
            </div>
          )}
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tight leading-none text-white mb-4">
            {business.name}
          </h1>
          {city && (
            <p className="flex items-center gap-2 text-white/50 text-sm uppercase tracking-[0.3em] font-semibold">
              <MapPin className="w-4 h-4" />{city}
            </p>
          )}
          <div className="mt-10 flex items-center gap-4">
            <a href="#galeria" className="bg-white text-zinc-950 font-black text-sm uppercase tracking-widest px-8 py-3.5 hover:bg-zinc-100 transition-colors">
              {t.actions.allPhotos}
            </a>
            <a href="#contacto" className="border border-white/50 text-white font-black text-sm uppercase tracking-widest px-8 py-3.5 hover:border-white transition-colors">
              {t.actions.contact}
            </a>
          </div>
        </div>
        {/* Scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 animate-bounce">
          <div className="w-px h-12 bg-gradient-to-b from-white/0 to-white/40" />
        </div>
      </div>

      {/* Masonry photo grid */}
      {masonryRefs.length > 0 && (
        <div id="galeria" className="py-20 px-6">
          <div className="mx-auto max-w-6xl">
            <p className="text-xs font-black uppercase tracking-[0.4em] text-white/40 mb-12 text-center">— {t.sections.gallery} —</p>
            <div className="columns-2 sm:columns-3 gap-3 space-y-3">
              {masonryRefs.map((ref, i) => (
                <div key={i} className={`break-inside-avoid overflow-hidden ${HEIGHTS[i % HEIGHTS.length]} bg-zinc-800`}>
                  <img src={photoUrl(ref)} alt={`foto ${i + 2}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 brightness-90 hover:brightness-100" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Stats band */}
      {business.rating && (
        <div className="border-y border-white/10 py-12">
          <div className="mx-auto max-w-4xl px-6 grid grid-cols-3 divide-x divide-white/10 text-center">
            <div className="px-8">
              <p className="text-4xl font-black text-white">{business.rating.toFixed(1)}</p>
              <p className="text-xs uppercase tracking-widest text-white/40 mt-1">{t.labels.rating}</p>
            </div>
            <div className="px-8">
              <p className="text-4xl font-black text-white">{business.num_reviews ?? '—'}</p>
              <p className="text-xs uppercase tracking-widest text-white/40 mt-1">{t.labels.reviews}</p>
            </div>
            <div className="px-8">
              <p className="text-4xl font-black text-white">★</p>
              <p className="text-xs uppercase tracking-widest text-white/40 mt-1">Google</p>
            </div>
          </div>
        </div>
      )}

      {/* Reviews */}
      {reviews.length > 0 && (
        <div id="resenas" className="py-20 px-6">
          <div className="mx-auto max-w-6xl">
            <p className="text-xs font-black uppercase tracking-[0.4em] text-white/40 mb-12 text-center">— {t.sections.reviews} —</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10">
              {reviews.map((r, i) => (
                <div key={i} className="bg-zinc-950 p-8">
                  <div className="flex gap-0.5 mb-4">
                    {[1,2,3,4,5].map(n => (
                      <Star key={n} className={`w-3.5 h-3.5 ${n <= r.rating ? 'text-amber-400 fill-amber-400' : 'text-white/10 fill-white/10'}`} />
                    ))}
                  </div>
                  <p className="text-white/70 text-sm leading-relaxed mb-6 line-clamp-5 italic">"{r.text}"</p>
                  <p className="text-xs font-black uppercase tracking-widest text-white/40">— {r.author}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Contact */}
      <div id="contacto" className="py-20 px-6 border-t border-white/10">
        <div className="mx-auto max-w-md text-center">
          <MapEmbed business={business} className="mb-10 text-left" height="h-56" />
          <p className="text-xs font-black uppercase tracking-[0.4em] text-white/40 mb-4">— {t.sections.contact} —</p>
          <h2 className="text-3xl font-black text-white mb-2">{business.name}</h2>
          {city && (
            <p className="text-white/40 text-sm mb-10 flex items-center justify-center gap-1.5">
              <MapPin className="w-4 h-4" />{city}
            </p>
          )}
          <div className="flex flex-col gap-3">
            {business.phone && (
              <a href={`tel:${business.phone}`} className="flex items-center justify-center gap-3 border border-white/20 px-6 py-4 text-sm font-bold text-white hover:border-white transition-colors">
                <Phone className="w-4 h-4" />{business.phone}
              </a>
            )}
            {business.whatsapp && (
              <a href={`https://wa.me/${business.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 bg-white text-zinc-950 px-6 py-4 text-sm font-black hover:bg-zinc-200 transition-colors">
                <MessageCircle className="w-4 h-4" />{t.actions.whatsapp}
              </a>
            )}
            <a href="https://innovando.cl/contacto" className="flex items-center justify-center gap-3 bg-white text-zinc-950 px-6 py-4 text-sm font-black hover:bg-zinc-200 transition-colors">
              {t.actions.reserve}
            </a>
          </div>
          {business.address && (
            <p className="text-white/30 text-xs mt-8 flex items-center justify-center gap-1">
              <MapPin className="w-3 h-3" />{business.address}
            </p>
          )}
        </div>
      </div>

      <footer className="py-6 border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 flex items-center justify-between">
          <p className="text-xs font-black uppercase tracking-widest text-white/30">{business.name}</p>
          <div className="flex items-center gap-4">
            <Camera className="w-4 h-4 text-white/20 hover:text-white/60 transition-colors cursor-pointer" />
            <p className="text-xs text-white/20">{t.labels.createdBy} <a href="https://innovando.cl" className="hover:text-white/50 transition-colors">Innovando</a></p>
          </div>
        </div>
      </footer>
    </div>
  )
}
