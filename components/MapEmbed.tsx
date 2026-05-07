import { MapPin, ExternalLink } from 'lucide-react'
import { Business } from '@/types'

interface Props {
  business: Pick<Business, 'name' | 'latitude' | 'longitude' | 'google_maps_url' | 'address'>
  className?: string
  height?: string
}

export default function MapEmbed({ business, className = '', height = 'h-64' }: Props) {
  const { latitude: lat, longitude: lng, google_maps_url, address, name } = business

  if (!lat || !lng) return null

  const embedSrc =
    `https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed&hl=es`

  const mapsUrl = google_maps_url
    ?? `https://www.google.com/maps?q=${lat},${lng}`

  return (
    <div className={`relative overflow-hidden rounded-2xl border border-gray-200 shadow-sm ${className}`}>
      <div className={`w-full ${height}`}>
        <iframe
          title={`Mapa ${name}`}
          src={embedSrc}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full"
        />
      </div>
      {/* Overlay link */}
      <a
        href={mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm px-4 py-2.5 flex items-center justify-between text-sm font-semibold text-gray-800 hover:bg-white transition-colors"
      >
        <span className="flex items-center gap-2 truncate">
          <MapPin className="w-4 h-4 text-emerald-500 shrink-0" />
          <span className="truncate">{address ?? name}</span>
        </span>
        <ExternalLink className="w-3.5 h-3.5 text-gray-400 shrink-0 ml-2" />
      </a>
    </div>
  )
}
