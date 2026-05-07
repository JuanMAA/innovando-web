import { Business, Review } from '@/types'
import { Lang, T, t as getT } from '@/lib/i18n'
import ClassicTheme from './themes/ClassicTheme'
import AirbnbTheme from './themes/AirbnbTheme'
import MasonryTheme from './themes/MasonryTheme'
import TripAdvisorTheme from './themes/TripAdvisorTheme'
import LinktreeTheme from './themes/LinktreeTheme'

export type SiteStyle = 'classic' | 'airbnb' | 'masonry' | 'tripadvisor' | 'linktree'

interface Props {
  business: Business
  photoRefs: string[]
  reviews: Review[]
  style?: SiteStyle
  lang?: Lang
}

export default function SitioWeb({ style = 'classic', lang = 'es', ...rest }: Props) {
  const t: T = getT(lang)
  const themeProps = { ...rest, t }

  switch (style) {
    case 'airbnb':      return <AirbnbTheme {...themeProps} />
    case 'masonry':     return <MasonryTheme {...themeProps} />
    case 'tripadvisor': return <TripAdvisorTheme {...themeProps} />
    case 'linktree':    return <LinktreeTheme {...themeProps} />
    default:            return <ClassicTheme {...themeProps} />
  }
}
