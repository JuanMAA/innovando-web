import { MapPin, Phone, MessageCircle, Globe, Star, ExternalLink, Camera, Share2 } from 'lucide-react'
import { Business, Review } from '@/types'

interface Props {
  business: Business
  photoRefs: string[]
  reviews: Review[]
}

function photoUrl(ref: string) { return `/api/photo?ref=${ref}` }

export default function LinktreeTheme({ business, photoRefs, reviews }: Props) {
  const city = [business.city, business.country === 'cl' ? 'Chile' : business.country].filter(Boolean).join(', ')
  const avatarRef = photoRefs[0] ?? null
  const topReview = reviews.find(r => r.rating >= 4) ?? null

  return (
    <div className="min-h-screen flex flex-col items-center justify-start py-12 px-4"
      style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 40%, #db2777 100%)' }}>

      {/* Avatar */}
      <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white/30 shadow-2xl mb-4 shrink-0">
        {avatarRef
          ? <img src={photoUrl(avatarRef)} alt={business.name} className="w-full h-full object-cover" />
          : (
            <div className="w-full h-full flex items-center justify-center bg-white/20">
              <span className="text-3xl font-black text-white">{business.name[0]}</span>
            </div>
          )}
      </div>

      {/* Name + location */}
      <h1 className="text-xl font-black text-white text-center mb-1">{business.name}</h1>
      {city && (
        <p className="flex items-center gap-1.5 text-white/60 text-sm mb-2">
          <MapPin className="w-3.5 h-3.5" />{city}
        </p>
      )}

      {/* Rating pill */}
      {business.rating && (
        <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5 mb-8">
          {[1,2,3,4,5].map(n => (
            <Star key={n} className={`w-3.5 h-3.5 ${n <= Math.round(business.rating!) ? 'text-amber-300 fill-amber-300' : 'text-white/20 fill-white/20'}`} />
          ))}
          <span className="text-white text-sm font-bold ml-0.5">{business.rating.toFixed(1)}</span>
          <span className="text-white/50 text-xs">· {business.num_reviews} reseñas</span>
        </div>
      )}

      {/* Link buttons */}
      <div className="w-full max-w-sm space-y-3">
        {/* Reservar — primary */}
        <a href="https://innovando.cl/contacto"
          className="flex items-center justify-between w-full bg-white text-indigo-700 font-black text-sm rounded-2xl px-5 py-4 shadow-lg hover:scale-[1.02] transition-transform">
          <span>📅 Hacer una reserva</span>
          <ExternalLink className="w-4 h-4 opacity-50" />
        </a>

        {business.phone && (
          <a href={`tel:${business.phone}`}
            className="flex items-center justify-between w-full bg-white/15 backdrop-blur-sm text-white font-bold text-sm rounded-2xl px-5 py-4 border border-white/20 hover:bg-white/25 transition-colors">
            <span className="flex items-center gap-3"><Phone className="w-4 h-4" />{business.phone}</span>
            <ExternalLink className="w-4 h-4 opacity-40" />
          </a>
        )}

        {business.whatsapp && (
          <a href={`https://wa.me/${business.whatsapp}`} target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-between w-full bg-green-500/80 backdrop-blur-sm text-white font-bold text-sm rounded-2xl px-5 py-4 border border-green-400/30 hover:bg-green-500 transition-colors">
            <span className="flex items-center gap-3"><MessageCircle className="w-4 h-4" />WhatsApp</span>
            <ExternalLink className="w-4 h-4 opacity-40" />
          </a>
        )}

        {business.website && (
          <a href={business.website} target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-between w-full bg-white/15 backdrop-blur-sm text-white font-bold text-sm rounded-2xl px-5 py-4 border border-white/20 hover:bg-white/25 transition-colors">
            <span className="flex items-center gap-3"><Globe className="w-4 h-4" />Sitio web actual</span>
            <ExternalLink className="w-4 h-4 opacity-40" />
          </a>
        )}

        {business.address && (
          <a href={`https://www.google.com/maps/search/${encodeURIComponent(business.address)}`} target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-between w-full bg-white/15 backdrop-blur-sm text-white font-bold text-sm rounded-2xl px-5 py-4 border border-white/20 hover:bg-white/25 transition-colors">
            <span className="flex items-center gap-3"><MapPin className="w-4 h-4" />Cómo llegar</span>
            <ExternalLink className="w-4 h-4 opacity-40" />
          </a>
        )}

        {/* Social icons row */}
        <div className="flex items-center justify-center gap-5 pt-2">
          <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
            <Camera className="w-4 h-4 text-white" />
          </button>
          <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
            <Share2 className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Top review quote */}
        {topReview && (
          <div className="mt-4 bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/15">
            <div className="flex gap-0.5 mb-2">
              {[1,2,3,4,5].map(n => (
                <Star key={n} className={`w-3 h-3 ${n <= topReview.rating ? 'text-amber-300 fill-amber-300' : 'text-white/20 fill-white/20'}`} />
              ))}
            </div>
            <p className="text-white/80 text-xs leading-relaxed italic line-clamp-3">"{topReview.text}"</p>
            <p className="text-white/40 text-xs mt-2 font-semibold">— {topReview.author}</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <p className="mt-10 text-white/30 text-xs">
        Sitio creado por{' '}
        <a href="https://innovando.cl" className="text-white/50 hover:text-white transition-colors">Innovando</a>
      </p>
    </div>
  )
}
