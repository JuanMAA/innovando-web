import { notFound } from 'next/navigation'
import { getBusinessPageData } from '@/lib/business-data'
import SitioWeb from '@/components/SitioWeb'

export const revalidate = 0

interface PageProps {
  searchParams: Promise<{ id?: string }>
}

export default async function DemoPage({ searchParams }: PageProps) {
  const { id: queryId } = await searchParams
  const id = queryId ?? process.env.BUSINESS_ID
  if (!id) notFound()

  const data = await getBusinessPageData(id)
  if (!data) notFound()

  return <SitioWeb {...data} />
}
