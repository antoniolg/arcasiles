import { describe, expect, it } from 'vitest'
import { clubs } from '../data/clubs'
import { getSuggestedClubs } from './suggestions'

describe('getSuggestedClubs', () => {
  it('returns no suggestions when there is no reader profile', () => {
    expect(getSuggestedClubs(clubs, null)).toEqual([])
  })

  it('prioritizes clubs that match city, modality, pace, and genres', () => {
    const suggestions = getSuggestedClubs(clubs, {
      city: 'Madrid',
      favoriteGenres: ['Narrativa', 'Contemporanea'],
      pace: 'mensual',
      preferredModality: 'presencial',
    })

    expect(suggestions).toHaveLength(3)
    expect(suggestions[0]).toMatchObject({
      clubId: 'pagina-37',
      score: 12,
    })
    expect(suggestions[0].reasons).toEqual([
      'Coincide con tu ciudad: Madrid',
      'Encaja con tu preferencia presencial',
      'Toca tus generos: Narrativa, Contemporanea',
    ])
    expect(suggestions.map((suggestion) => suggestion.clubId)).toEqual([
      'pagina-37',
      'casa-amarilla',
      'atlas-fantastico',
    ])
  })
})
