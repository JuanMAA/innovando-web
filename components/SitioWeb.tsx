import { Business, Review } from '@/types'
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
}

export default function SitioWeb({ style = 'classic', ...rest }: Props) {
  switch (style) {
    case 'airbnb':      return <AirbnbTheme {...rest} />
    case 'masonry':     return <MasonryTheme {...rest} />
    case 'tripadvisor': return <TripAdvisorTheme {...rest} />
    case 'linktree':    return <LinktreeTheme {...rest} />
    default:            return <ClassicTheme {...rest} />
  }
}
