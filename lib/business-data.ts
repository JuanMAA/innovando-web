import { createAdminClient } from '@/lib/supabase/admin'
import { Business, Review } from '@/types'

function extractPhotoRef(url: string): string | null {
  try {
    return new URL(url).searchParams.get('photo_reference')
  } catch {
    return null
  }
}

async function fetchPhotoRefsFromPlaces(placeId: string): Promise<string[]> {
  const key = process.env.GOOGLE_PLACES_API_KEY!
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=photos&key=${key}`
  try {
    const res = await fetch(url, { next: { revalidate: 3600 } })
    const json = await res.json()
    const photos: { photo_reference: string }[] = json.result?.photos ?? []
    return photos.slice(0, 5).map((p) => p.photo_reference)
  } catch {
    return []
  }
}

export interface BusinessPageData {
  business: Business
  photoRefs: string[]
  reviews: Review[]
}

export async function getBusinessPageData(id: string): Promise<BusinessPageData | null> {
  const supabase = createAdminClient()

  const { data: business } = await supabase
    .from('businesses')
    .select('*')
    .eq('id', id)
    .maybeSingle<Business>()

  if (!business) return null

  const { data: dataRows } = await supabase
    .from('business_data')
    .select('key, value, value_type')
    .eq('business_id', business.id)
    .eq('module', 'maps')
    .in('key', ['photo_urls', 'reviews'])

  const rowMap = Object.fromEntries((dataRows ?? []).map((r) => [r.key, r.value]))

  let photoRefs: string[] = []
  if (rowMap.photo_urls) {
    try {
      const urls: string[] = JSON.parse(rowMap.photo_urls)
      photoRefs = urls.map(extractPhotoRef).filter(Boolean) as string[]
    } catch { /* ignore */ }
  }

  const auditNeedsAttention =
    !business.website ||
    business.lh_action === 'reemplazar' ||
    business.lh_action === 'optimizar' ||
    (business.lh_performance !== null && business.lh_performance !== undefined && business.lh_performance < 70)

  if (photoRefs.length === 0 && business.place_id && auditNeedsAttention) {
    photoRefs = await fetchPhotoRefsFromPlaces(business.place_id)
  }

  let reviews: Review[] = []
  if (rowMap.reviews) {
    try {
      const all: Review[] = JSON.parse(rowMap.reviews)
      const positive = all.filter((r) => r.rating >= 4)
      reviews = positive.length > 0 ? positive.slice(0, 3) : all.slice(0, 2)
    } catch { /* ignore */ }
  }

  return { business, photoRefs, reviews }
}
