import { notFound } from 'next/navigation'
import { getBusinessPageData } from '@/lib/business-data'
import SitioWeb, { SiteStyle } from '@/components/SitioWeb'

export const revalidate = 0

const VALID_STYLES: SiteStyle[] = ['classic', 'airbnb', 'masonry', 'tripadvisor', 'linktree']

interface PageProps {
  searchParams: Promise<{ id?: string; style?: string }>
}

export default async function HomePage({ searchParams }: PageProps) {
  const { id: queryId, style: queryStyle } = await searchParams
  const id = queryId ?? process.env.BUSINESS_ID
  if (!id) notFound()

  const data = await getBusinessPageData(id)
  if (!data) notFound()

  const style: SiteStyle = VALID_STYLES.includes(queryStyle as SiteStyle)
    ? (queryStyle as SiteStyle)
    : 'classic'

  return <SitioWeb {...data} style={style} />
}
