export type ClubModality = 'online' | 'presencial'
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
  imageUrl: string
  members: number
  venue: string
  about: string
}
