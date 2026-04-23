import type { ClubModality } from '../entities/Club'

export interface ClubFilters {
  modality: 'all' | ClubModality
  city: 'all' | string
  genre: 'all' | string
}
