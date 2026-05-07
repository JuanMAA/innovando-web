import { MapPin, Phone, MessageCircle, Star, Share2, Heart } from 'lucide-react'
import MapEmbed from '@/components/MapEmbed'
import { Business, Review } from '@/types'
import { T } from '@/lib/i18n'

interface Props {
  business: Business
  photoRefs: string[]
  reviews: Review[]
  t: T
}

function Stars({ rating, size = 'sm' }: { rating: number; size?: 'sm' | 'md' }) {
  const cls = size === 'md' ? 'w-5 h-5' : 'w-3.5 h-3.5'
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star key={n} className={`${cls} ${n <= Math.round(rating) ? 'text-rose-500 fill-rose-500' : 'text-gray-200 fill-gray-200'}`} />
      ))}
    </div>
  )
}

function photoUrl(ref: string) { return `/api/photo?ref=${ref}` }

function Avatar({ name }: { name: string }) {
  const initials = name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase()
  const colors = ['bg-rose-400', 'bg-orange-400', 'bg-teal-400', 'bg-violet-400', 'bg-sky-400']
  const color = colors[name.charCodeAt(0) % colors.length]
  return (
    <span className={`inline-flex items-center justify-center w-10 h-10 rounded-full text-white text-sm font-bold shrink-0 ${color}`}>
      {initials}
    </span>
  )
}

export default function AirbnbTheme({ business, photoRefs, reviews, t }: Props) {
  const categoryLabel = business.category ?? t.labels.accommodation
  const city = [business.city, business.country === 'cl' ? 'Chile' : business.country].filter(Boolean).join(', ')
  const [p1, p2, p3, p4, p5] = photoRefs

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <span className="text-rose-500 text-xl font-black tracking-tight truncate max-w-[200px]">{business.name}</span>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700">
            <a href="#galeria" className="hover:text-gray-900">{t.nav.gallery}</a>
            <a href="#resenas" className="hover:text-gray-900">{t.nav.reviews}</a>
            <a href="#contacto" className="hover:text-gray-900">{t.nav.contact}</a>
          </nav>
          <a href="#contacto" className="inline-flex items-center gap-2 rounded-full bg-rose-500 px-4 py-2 text-sm font-semibold text-white hover:bg-rose-600 transition-colors">
            {t.nav.book}
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">
        {/* Title row */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">{business.name}</h1>
            <div className="flex items-center gap-2 mt-1 text-sm text-gray-700">
              {business.rating && (
                <>
                  <Star className="w-3.5 h-3.5 fill-gray-900 text-gray-900" />
                  <span className="font-semibold">{business.rating.toFixed(2)}</span>
                  <span className="text-gray-400">·</span>
                  <span className="underline font-medium cursor-pointer">{business.num_reviews} {t.labels.reviews}</span>
                  <span className="text-gray-400">·</span>
                </>
              )}
              {city && <span className="underline font-medium cursor-pointer">{city}</span>}
            </div>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <button className="flex items-center gap-1.5 text-gray-700 hover:text-gray-900 underline font-medium">
              <Share2 className="w-4 h-4" />{t.actions.share}
            </button>
            <button className="flex items-center gap-1.5 text-gray-700 hover:text-gray-900 underline font-medium">
              <Heart className="w-4 h-4" />{t.actions.save}
            </button>
          </div>
        </div>

        {/* Photo grid */}
        <div id="galeria" className="grid grid-cols-4 grid-rows-2 gap-2 rounded-2xl overflow-hidden h-[420px] mb-10">
          <div className="col-span-2 row-span-2 bg-gray-200">
            {p1
              ? <img src={photoUrl(p1)} alt="main" className="w-full h-full object-cover" />
              : <div className="w-full h-full bg-gradient-to-br from-rose-100 to-orange-100" />}
          </div>
          {[p2, p3, p4, p5].map((ref, i) => (
            <div key={i} className="bg-gray-100">
              {ref
                ? <img src={photoUrl(ref)} alt={`foto ${i + 2}`} className="w-full h-full object-cover" />
                : <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200" />}
            </div>
          ))}
        </div>

        {/* Content + Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12">
          {/* Left */}
          <div>
            <div className="pb-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-1">
                {categoryLabel} en {city}
              </h2>
              {business.address && (
                <p className="text-gray-500 text-sm flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 shrink-0" />{business.address}
                </p>
              )}
            </div>

            <div className="py-8 border-b border-gray-200">
              <p className="text-gray-700 leading-relaxed">
                Bienvenido a {business.name}, tu {categoryLabel.toLowerCase()} de confianza en {city}.
                Ofrecemos una experiencia única con atención personalizada y un ambiente acogedor.
                {business.rating && business.rating >= 4.5 ? ' Uno de los espacios mejor valorados de la zona.' : ''}
              </p>
            </div>

            {/* Reviews */}
            {reviews.length > 0 && (
              <div id="resenas" className="py-8">
                <div className="flex items-center gap-3 mb-6">
                  {business.rating && (
                    <>
                      <Star className="w-5 h-5 fill-gray-900 text-gray-900" />
                      <span className="text-xl font-semibold">{business.rating.toFixed(2)}</span>
                      <span className="text-gray-400">·</span>
                    </>
                  )}
                  <span className="text-xl font-semibold">{business.num_reviews} {t.labels.reviews}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {reviews.map((r, i) => (
                    <div key={i}>
                      <div className="flex items-center gap-3 mb-2">
                        <Avatar name={r.author} />
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{r.author}</p>
                          <p className="text-xs text-gray-400">{r.time}</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed line-clamp-4">{r.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Map */}
            <div className="py-8 border-t border-gray-200">
              <MapEmbed business={business} height="h-64" />
            </div>
          </div>

          {/* Sidebar */}
          <div id="contacto" className="hidden lg:block">
            <div className="sticky top-28 border border-gray-200 rounded-2xl p-6 shadow-xl">
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-xl font-bold text-gray-900">{t.actions.contact}</span>
              </div>
              {business.rating && (
                <div className="flex items-center gap-1.5 text-sm mb-4">
                  <Star className="w-3.5 h-3.5 fill-gray-900 text-gray-900" />
                  <span className="font-semibold">{business.rating.toFixed(2)}</span>
                  <span className="text-gray-400">·</span>
                  <span className="text-gray-500 underline cursor-pointer">{business.num_reviews} {t.labels.reviews}</span>
                </div>
              )}
              <div className="flex flex-col gap-3 mt-4">
                {business.phone && (
                  <a href={`tel:${business.phone}`} className="w-full flex items-center justify-center gap-2 rounded-xl border-2 border-gray-900 px-4 py-3.5 text-sm font-bold text-gray-900 hover:bg-gray-50 transition-colors">
                    <Phone className="w-4 h-4" />{business.phone}
                  </a>
                )}
                {business.whatsapp && (
                  <a href={`https://wa.me/${business.whatsapp}`} target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center gap-2 rounded-xl bg-rose-500 px-4 py-3.5 text-sm font-bold text-white hover:bg-rose-600 transition-colors">
                    <MessageCircle className="w-4 h-4" />{t.actions.whatsapp}
                  </a>
                )}
                <a href="https://innovando.cl/contacto" className="w-full flex items-center justify-center gap-2 rounded-xl bg-rose-500 px-4 py-3.5 text-sm font-bold text-white hover:bg-rose-600 transition-colors">
                  {t.actions.bookNow}
                </a>
              </div>
              <p className="text-center text-xs text-gray-400 mt-4">{t.labels.noCharge}</p>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 lg:hidden bg-white border-t border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="text-sm">
          <span className="font-bold text-gray-900">{t.actions.bookNow}</span>
          {business.rating && <div className="flex items-center gap-1 text-xs text-gray-500"><Star className="w-3 h-3 fill-gray-700 text-gray-700" />{business.rating.toFixed(1)}</div>}
        </div>
        <a href={`tel:${business.phone ?? '#'}`} className="rounded-xl bg-rose-500 px-6 py-3 text-sm font-bold text-white hover:bg-rose-600 transition-colors">
          {t.actions.contact}
        </a>
      </div>
      <div className="h-24 lg:hidden" />
    </div>
  )
}
