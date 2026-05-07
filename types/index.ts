export interface Business {
  id: string
  place_id: string
  slug: string
  name: string
  category: string | null
  city: string | null
  country: string
  address: string | null
  phone: string | null
  email: string | null
  whatsapp: string | null
  website: string | null
  rating: number | null
  num_reviews: number
  latitude: number | null
  longitude: number | null
  google_maps_url: string | null
  lh_performance: number | null
  lh_action: string | null
}

export interface Review {
  text: string
  rating: number
  author: string
  time: string
  language: string
}
