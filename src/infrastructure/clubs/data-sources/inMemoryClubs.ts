import rawClubs from './clubs.json'
import type { Club } from '../../../domain/clubs/entities/Club'

interface RawClubRecord {
  id: string
  name: string
  description: string
  city: string
  modality: Club['modality']
  genres: string[]
  nextBook: string
  nextDate: string
  spotsLeft: number
  hostName: string
  image: string
  pace: Club['pace']
  imageUrl: string
  members: number
  venue: string
  about: string
}

export const inMemoryClubs: Club[] = (rawClubs as RawClubRecord[]).map((club) => ({
  ...club,
}))
