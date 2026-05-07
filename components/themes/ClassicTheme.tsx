import { MapPin, Phone, Globe, Star, ChevronRight, MessageCircle } from 'lucide-react'
import { Business, Review } from '@/types'

interface Props {
  business: Business
  photoRefs: string[]
  reviews: Review[]
}

const CATEGORY_LABELS: Record<string, string> = {
  hotel: 'Hotel',
  hostal: 'Hostal',
  'cabaña': 'Cabaña turística',
  restaurante: 'Restaurante',
}

export function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star key={n} className={`w-4 h-4 ${n <= Math.round(rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`} />
      ))}
    </div>
  )
}

export function photoUrl(ref: string) {
  return `/api/photo?ref=${ref}`
}

export default function ClassicTheme({ business, photoRefs, reviews }: Props) {
  const heroRef = photoRefs[0] ?? null
  const galleryRefs = photoRefs.slice(1, 5)
  const categoryLabel = CATEGORY_LABELS[business.category ?? ''] ?? business.category ?? 'Alojamiento'
  const city = [business.city, business.country === 'cl' ? 'Chile' : business.country].filter(Boolean).join(', ')

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-white border-b border-gray-100 shadow-sm">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900 tracking-tight">{business.name}</span>
          <nav className="hidden sm:flex items-center gap-6 text-sm text-gray-600 font-medium">
            <a href="#" className="hover:text-gray-900">Inicio</a>
            <a href="#galeria" className="hover:text-gray-900">Galería</a>
            <a href="#resenas" className="hover:text-gray-900">Reseñas</a>
            <a href="#contacto" className="hover:text-gray-900">Contacto</a>
          </nav>
          <a href="#contacto" className="inline-flex items-center gap-2 rounded-xl bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800 transition-colors">
            Reservar
          </a>
        </div>
      </header>

      <div className="relative h-[70vh] min-h-[420px] overflow-hidden">
        {heroRef
          ? <img src={photoUrl(heroRef)} alt={business.name} className="absolute inset-0 w-full h-full object-cover" />
          : <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-900" />}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-10">
          <div className="mx-auto max-w-6xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-white/70 mb-2">{categoryLabel}</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight drop-shadow-lg mb-3">{business.name}</h1>
            <div className="flex flex-wrap items-center gap-4">
              {business.rating && (
                <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-3 py-1.5">
                  <Stars rating={business.rating} />
                  <span className="text-white font-bold text-sm">{business.rating.toFixed(1)}</span>
                  <span className="text-white/70 text-sm">({business.num_reviews} reseñas)</span>
                </div>
              )}
              {city && (
                <div className="flex items-center gap-1.5 text-white/80 text-sm">
                  <MapPin className="w-4 h-4" />{city}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {galleryRefs.length > 0 && (
        <div id="galeria" className="bg-gray-50 py-12">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Galería</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {galleryRefs.map((ref, i) => (
                <img key={i} src={photoUrl(ref)} alt={`Foto ${i + 2}`} className="w-full aspect-[4/3] object-cover rounded-xl" />
              ))}
            </div>
          </div>
        </div>
      )}

      <div id="contacto" className="py-14 bg-white">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Sobre {business.name}</h2>
              <p className="text-gray-600 leading-relaxed text-base mb-6">
                {categoryLabel} ubicado en {city}. Ofrecemos una experiencia acogedora con atención personalizada.
                {business.rating && business.rating >= 4 ? ' Altamente valorado por nuestros huéspedes en Google.' : ''}
              </p>
              {business.address && (
                <div className="flex items-start gap-3 text-gray-600 mb-3">
                  <MapPin className="w-5 h-5 mt-0.5 text-gray-400 shrink-0" /><span>{business.address}</span>
                </div>
              )}
              {business.website && (
                <div className="flex items-center gap-3 text-gray-600 mb-3">
                  <Globe className="w-5 h-5 text-gray-400 shrink-0" />
                  <a href={business.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline truncate">
                    {business.website.replace(/^https?:\/\//, '')}
                  </a>
                </div>
              )}
            </div>
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-5">Contactar</h3>
              <div className="flex flex-col gap-3">
                {business.phone && (
                  <a href={`tel:${business.phone}`} className="inline-flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-sm font-semibold text-gray-800 hover:bg-gray-50 transition-colors">
                    <Phone className="w-4 h-4 text-gray-400" />{business.phone}
                  </a>
                )}
                {business.whatsapp && (
                  <a href={`https://wa.me/${business.whatsapp}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 rounded-xl bg-green-500 px-4 py-3.5 text-sm font-semibold text-white hover:bg-green-600 transition-colors">
                    <MessageCircle className="w-4 h-4" />WhatsApp
                  </a>
                )}
                <a href="https://innovando.cl/contacto" className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-900 px-4 py-3.5 text-sm font-bold text-white hover:bg-gray-800 transition-colors">
                  Hacer una reserva<ChevronRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {reviews.length > 0 && (
        <div id="resenas" className="py-14 bg-gray-50 border-t border-gray-100">
          <div className="mx-auto max-w-6xl px-6">
            <div className="flex items-end gap-4 mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Reseñas de Google</h2>
              {business.rating && (
                <div className="flex items-center gap-2 mb-0.5">
                  <Stars rating={business.rating} />
                  <span className="text-gray-600 font-semibold">{business.rating.toFixed(1)}</span>
                  <span className="text-gray-400 text-sm">· {business.num_reviews} reseñas</span>
                </div>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {reviews.map((review, i) => (
                <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm font-semibold text-gray-900">{review.author}</p>
                    <Stars rating={review.rating} />
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed line-clamp-4">{review.text}</p>
                  <p className="text-xs text-gray-400 mt-3">{review.time}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <footer className="bg-gray-950 py-6">
        <div className="mx-auto max-w-6xl px-6 flex items-center justify-between">
          <p className="text-sm font-semibold text-white">{business.name}</p>
          <p className="text-xs text-gray-500">Sitio web creado por{' '}
            <a href="https://innovando.cl" className="text-gray-400 hover:text-white transition-colors">Innovando</a>
          </p>
        </div>
      </footer>
    </div>
  )
}
