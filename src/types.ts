export type ClubModality = 'online' | 'presencial'
export type ReaderModalityPreference = ClubModality | 'indiferente'
export type Pace = 'mensual' | 'quincenal'

export interface Club {
  id: string
  name: string
  description: string
  city: string
  modality: ClubModality
  genres: string[]
  nextBook: string
  nextDate: string
  spotsLeft: number
  hostName: string
  image: string
  pace: Pace
}

export interface ReaderProfile {
  favoriteGenres: string[]
  preferredModality: ReaderModalityPreference
  city: string
  pace: Pace
}

export interface FilterState {
  modality: 'all' | ClubModality
  city: 'all' | string
  genre: 'all' | string
}

export interface SuggestionResult {
  clubId: string
  score: number
  reasons: string[]
}
