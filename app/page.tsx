import { notFound } from 'next/navigation'
import { getBusinessPageData } from '@/lib/business-data'
import SitioWeb from '@/components/SitioWeb'

export const revalidate = 0

export default async function HomePage() {
  const id = process.env.BUSINESS_ID
  if (!id) notFound()

  const data = await getBusinessPageData(id)
  if (!data) notFound()

  return <SitioWeb {...data} />
}
