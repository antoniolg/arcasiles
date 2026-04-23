import { describe, expect, it } from 'vitest'
import type { Club } from '../types'
import { getSuggestedClubs } from './suggestions'

const testClubs: Club[] = [
  {
    id: 'club-top',
    name: 'Club Top',
    description: 'Club de prueba',
    city: 'Madrid',
    modality: 'presencial',
    genres: ['Narrativa', 'Contemporanea'],
    nextBook: 'Libro A',
    nextDate: '2026-05-01',
    spotsLeft: 5,
    hostName: 'Ana',
    image: 'TOP',
    pace: 'mensual',
    imageUrl: 'https://example.com/top.jpg',
    members: 10,
    venue: 'Madrid',
    about: 'Club de prueba',
  },
  {
    id: 'club-city-match',
    name: 'Club City Match',
    description: 'Club de prueba',
    city: 'Madrid',
    modality: 'presencial',
    genres: ['Ensayo'],
    nextBook: 'Libro B',
    nextDate: '2026-05-02',
    spotsLeft: 5,
    hostName: 'Luis',
    image: 'CITY',
    pace: 'mensual',
    imageUrl: 'https://example.com/city.jpg',
    members: 8,
    venue: 'Madrid',
    about: 'Club de prueba',
  },
  {
    id: 'club-online',
    name: 'Club Online',
    description: 'Club de prueba',
    city: 'Online',
    modality: 'online',
    genres: ['Narrativa'],
    nextBook: 'Libro C',
    nextDate: '2026-05-03',
    spotsLeft: 5,
    hostName: 'Marta',
    image: 'ONLINE',
    pace: 'quincenal',
    imageUrl: 'https://example.com/online.jpg',
    members: 12,
    venue: 'Online',
    about: 'Club de prueba',
  },
  {
    id: 'club-no-match',
    name: 'Club No Match',
    description: 'Club de prueba',
    city: 'Bilbao',
    modality: 'online',
    genres: ['Historia'],
    nextBook: 'Libro D',
    nextDate: '2026-05-04',
    spotsLeft: 5,
    hostName: 'Pablo',
    image: 'NONE',
    pace: 'quincenal',
    imageUrl: 'https://example.com/none.jpg',
    members: 6,
    venue: 'Bilbao',
    about: 'Club de prueba',
  },
]

describe('getSuggestedClubs', () => {
  it('returns no suggestions when there is no reader profile', () => {
    expect(getSuggestedClubs(testClubs, null)).toEqual([])
  })

  it('prioritizes clubs that match city, modality, pace, and genres', () => {
    const suggestions = getSuggestedClubs(testClubs, {
      city: 'Madrid',
      favoriteGenres: ['Narrativa', 'Contemporanea'],
      pace: 'mensual',
      preferredModality: 'presencial',
    })

    expect(suggestions).toHaveLength(3)
    expect(suggestions[0]).toMatchObject({
      clubId: 'club-top',
      score: 12,
    })
    expect(suggestions[0].reasons).toEqual([
      'Coincide con tu ciudad: Madrid',
      'Encaja con tu preferencia presencial',
      'Toca tus generos: Narrativa, Contemporanea',
    ])
    expect(suggestions.map((suggestion) => suggestion.clubId)).toEqual([
      'club-top',
      'club-city-match',
      'club-online',
    ])
  })
})
