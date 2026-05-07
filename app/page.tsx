import { notFound } from 'next/navigation'
import { getBusinessPageData } from '@/lib/business-data'
import SitioWeb, { SiteStyle } from '@/components/SitioWeb'
import { getLang, Lang } from '@/lib/i18n'

export const revalidate = 0

const VALID_STYLES: SiteStyle[] = ['classic', 'airbnb', 'masonry', 'tripadvisor', 'linktree']

interface PageProps {
  searchParams: Promise<{ id?: string; style?: string; lang?: string }>
}

export default async function HomePage({ searchParams }: PageProps) {
  const { id: queryId, style: queryStyle, lang: queryLang } = await searchParams
  const id = queryId ?? process.env.BUSINESS_ID
  if (!id) notFound()

  const data = await getBusinessPageData(id)
  if (!data) notFound()

  const style: SiteStyle = VALID_STYLES.includes(queryStyle as SiteStyle)
    ? (queryStyle as SiteStyle)
    : 'classic'

  const lang: Lang = getLang(queryLang)

  return <SitioWeb {...data} style={style} lang={lang} />
}
