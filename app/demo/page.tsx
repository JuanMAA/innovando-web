import { notFound } from 'next/navigation'
import { getBusinessPageData } from '@/lib/business-data'
import SitioWeb from '@/components/SitioWeb'
import { ChevronRight } from 'lucide-react'

export const revalidate = 0

export default async function DemoPage() {
  const id = process.env.BUSINESS_ID
  if (!id) notFound()

  const data = await getBusinessPageData(id)
  if (!data) notFound()

  const reportsUrl = process.env.NEXT_PUBLIC_REPORTS_URL ?? 'http://localhost:3001'

  return (
    <>
      {/* Demo banner */}
      <div className="sticky top-0 z-50 bg-gray-900 border-b border-gray-700">
        <div className="mx-auto max-w-6xl px-4 py-2.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 px-2.5 py-0.5 text-xs font-semibold text-blue-300">
              Vista previa
            </span>
            <p className="text-sm text-gray-300 hidden sm:block">
              Así se vería el sitio web de{' '}
              <span className="font-semibold text-white">{data.business.name}</span> con Innovando
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <a
              href={`${reportsUrl}/${data.business.slug}`}
              className="text-xs text-gray-400 hover:text-white transition-colors hidden sm:block"
            >
              ← Volver al reporte
            </a>
            <a
              href="https://innovando.cl/contacto"
              className="inline-flex items-center gap-1.5 rounded-xl bg-white px-4 py-2 text-sm font-bold text-gray-900 hover:bg-gray-100 transition-colors"
            >
              Quiero este sitio
              <ChevronRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      <SitioWeb {...data} />

      {/* Bottom CTA */}
      <div className="bg-gray-900 py-14">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">Sitio web Innovando</p>
          <h2 className="text-3xl font-bold text-white mb-4">¿Te gustaría este sitio para tu negocio?</h2>
          <p className="text-gray-400 mb-8 leading-relaxed">
            Multiidioma, accesible, con reseñas y fotos de Google actualizadas automáticamente. Listo en 7 días.
          </p>
          <a
            href="https://innovando.cl/contacto"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-base font-bold text-gray-900 hover:bg-gray-100 transition-colors"
          >
            Quiero este sitio para mi negocio
            <ChevronRight className="w-5 h-5" />
          </a>
          <p className="text-xs text-gray-500 mt-4">Sin suscripción · pago único · entrega en 7 días</p>
        </div>
      </div>
    </>
  )
}
