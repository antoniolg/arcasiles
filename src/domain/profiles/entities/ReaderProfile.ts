import type { ClubModality, Pace } from '../../clubs/entities/Club'

export type ReaderModalityPreference = ClubModality | 'indiferente'

export interface ReaderProfile {
  favoriteGenres: string[]
  preferredModality: ReaderModalityPreference
  city: string
  pace: Pace
}
