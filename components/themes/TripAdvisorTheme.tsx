import { MapPin, Phone, MessageCircle, Star, Globe, CheckCircle2, Award } from 'lucide-react'
import { Business, Review } from '@/types'
import { T } from '@/lib/i18n'

interface Props {
  business: Business
  photoRefs: string[]
  reviews: Review[]
  t: T
}

function photoUrl(ref: string) { return `/api/photo?ref=${ref}` }

function BubbleRating({ rating }: { rating: number }) {
  const filled = Math.round(rating)
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <span key={n} className={`text-xl ${n <= filled ? 'text-emerald-500' : 'text-gray-200'}`}>●</span>
      ))}
    </div>
  )
}

export default function TripAdvisorTheme({ business, photoRefs, reviews, t }: Props) {
  const categoryLabel = business.category ?? t.labels.accommodation
  const city = [business.city, business.country === 'cl' ? 'Chile' : business.country].filter(Boolean).join(', ')
  const [hero, ...gallery] = photoRefs

  const ratingLabel =
    !business.rating ? '' :
    business.rating >= 4.8 ? t.labels.excellent :
    business.rating >= 4.5 ? t.labels.veryGood :
    business.rating >= 4.0 ? t.labels.good : t.labels.acceptable

  return (
    <div className="min-h-screen bg-gray-100 font-sans text-gray-900">
      {/* Top banner */}
      <div className="bg-emerald-600 text-white text-xs py-1.5 text-center font-semibold tracking-wide">
        🌟 {t.labels.googleReviews}
      </div>

      {/* Header — single tab bar with book CTA on the right */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="mx-auto max-w-6xl px-6 flex items-center justify-between overflow-x-auto">
          <div className="flex gap-0 shrink-0">
            {[t.nav.home, t.nav.reviews, t.nav.gallery, t.nav.contact].map((tab, i) => (
              <a key={tab} href={i === 1 ? '#resenas' : i === 2 ? '#galeria' : i === 3 ? '#contacto' : '#'} className={`px-5 py-3.5 text-sm font-semibold border-b-2 whitespace-nowrap transition-colors ${i === 0 ? 'border-emerald-600 text-emerald-700' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
                {tab}
              </a>
            ))}
          </div>
          <a href="#contacto" className="ml-4 shrink-0 bg-emerald-600 text-white text-sm font-bold px-4 py-2 rounded-full hover:bg-emerald-700 transition-colors">
            {t.nav.book}
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 sm:px-6 py-6">
        {/* Title + rating band */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-4 shadow-sm">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  {categoryLabel}
                </span>
                <span className="flex items-center gap-1 text-xs font-semibold text-emerald-700">
                  <CheckCircle2 className="w-3.5 h-3.5" /> {t.labels.verified}
                </span>
              </div>
              <h1 className="text-2xl font-black text-gray-900 mb-2">{business.name}</h1>
              {city && (
                <p className="flex items-center gap-1.5 text-sm text-gray-500">
                  <MapPin className="w-4 h-4 text-gray-400" />{business.address ?? city}
                </p>
              )}
            </div>
            {business.rating && (
              <div className="text-center bg-gray-50 border border-gray-200 rounded-xl p-4 min-w-[120px]">
                <p className="text-4xl font-black text-gray-900">{business.rating.toFixed(1)}</p>
                <BubbleRating rating={business.rating} />
                <p className="text-xs font-bold text-emerald-700 mt-1">{ratingLabel}</p>
                <p className="text-xs text-gray-400 mt-0.5">{business.num_reviews} {t.labels.reviews}</p>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-4">
          {/* Main column */}
          <div className="space-y-4">
            {/* Photos */}
            {hero && (
              <div id="galeria" className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                <div className="p-4 border-b border-gray-100">
                  <h2 className="text-base font-bold text-gray-900">{t.sections.gallery}</h2>
                </div>
                <div className="grid grid-cols-3 gap-0.5">
                  <div className="col-span-2 aspect-[4/3]">
                    <img src={photoUrl(hero)} alt="principal" className="w-full h-full object-cover" />
                  </div>
                  <div className="grid grid-rows-2 gap-0.5">
                    {gallery.slice(0, 2).map((ref, i) => (
                      <img key={i} src={photoUrl(ref)} alt={`foto ${i + 2}`} className="w-full h-full object-cover" />
                    ))}
                  </div>
                  {gallery.slice(2, 5).map((ref, i) => (
                    <div key={i} className="aspect-square">
                      <img src={photoUrl(ref)} alt={`foto ${i + 4}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Reviews */}
            {reviews.length > 0 && (
              <div id="resenas" className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                  <h2 className="text-base font-bold text-gray-900">{t.sections.reviews}</h2>
                  {business.rating && <BubbleRating rating={business.rating} />}
                </div>
                <div className="divide-y divide-gray-100">
                  {reviews.map((r, i) => (
                    <div key={i} className="p-5">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-black text-sm shrink-0">
                          {r.author[0].toUpperCase()}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <p className="text-sm font-bold text-gray-900">{r.author}</p>
                            <BubbleRating rating={r.rating} />
                            <span className="text-xs text-gray-400">{r.time}</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed">{r.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Award badge */}
            {business.rating && business.rating >= 4.5 && (
              <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm text-center">
                <Award className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                <p className="text-xs font-black uppercase tracking-wide text-gray-700">{t.labels.travelersChoice}</p>
                <p className="text-xs text-gray-400 mt-1">{t.labels.topRated}</p>
              </div>
            )}
            {/* Contact card */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
              <h3 className="text-sm font-bold text-gray-900 mb-4">{t.sections.contact}</h3>
              <div className="space-y-3">
                {business.address && (
                  <div className="flex items-start gap-2.5 text-sm text-gray-600">
                    <MapPin className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />{business.address}
                  </div>
                )}
                {business.website && (
                  <div className="flex items-center gap-2.5 text-sm">
                    <Globe className="w-4 h-4 text-gray-400 shrink-0" />
                    <a href={business.website} target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline truncate">
                      {business.website.replace(/^https?:\/\//, '')}
                    </a>
                  </div>
                )}
              </div>
              <div className="mt-4 space-y-2">
                {business.phone && (
                  <a href={`tel:${business.phone}`} className="w-full flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
                    <Phone className="w-4 h-4 text-gray-400" />{business.phone}
                  </a>
                )}
                {business.whatsapp && (
                  <a href={`https://wa.me/${business.whatsapp}`} target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center gap-2 rounded-lg bg-green-500 px-4 py-3 text-sm font-semibold text-white hover:bg-green-600 transition-colors">
                    <MessageCircle className="w-4 h-4" />{t.actions.whatsapp}
                  </a>
                )}
                <a href="https://innovando.cl/contacto" className="w-full flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-3 text-sm font-bold text-white hover:bg-emerald-700 transition-colors">
                  {t.actions.contact}
                </a>
              </div>
            </div>
            {/* Map placeholder */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
              <div className="h-40 bg-gradient-to-br from-emerald-50 to-teal-100 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-8 h-8 text-emerald-400 mx-auto mb-1" />
                  <p className="text-xs font-semibold text-gray-500">{city}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-900 text-gray-400 py-6 mt-8">
        <div className="mx-auto max-w-6xl px-6 flex items-center justify-between text-xs">
          <span>© 2025 {business.name}</span>
          <span>{t.labels.createdBy} <a href="https://innovando.cl" className="text-emerald-400 hover:text-emerald-300">Innovando</a></span>
        </div>
      </footer>
    </div>
  )
}
