import type { Club, ReaderProfile, SuggestionResult } from '../types'

export function getSuggestedClubs(
  clubs: Club[],
  profile: ReaderProfile | null,
): SuggestionResult[] {
  if (!profile) {
    return []
  }

  return clubs
    .map((club) => {
      let score = 0
      const reasons: string[] = []

      const sharedGenres = club.genres.filter((genre) =>
        profile.favoriteGenres.includes(genre),
      )

      if (profile.city && profile.city === club.city) {
        score += 3
        reasons.push(`Coincide con tu ciudad: ${club.city}`)
      }

      if (
        profile.preferredModality !== 'indiferente' &&
        club.modality === profile.preferredModality
      ) {
        score += 2
        reasons.push(`Encaja con tu preferencia ${profile.preferredModality}`)
      }

      if (sharedGenres.length > 0) {
        score += sharedGenres.length * 3
        reasons.push(`Toca tus generos: ${sharedGenres.join(', ')}`)
      }

      if (club.pace === profile.pace) {
        score += 1
        reasons.push(`Sigue tu ritmo ${profile.pace}`)
      }

      return {
        clubId: club.id,
        score,
        reasons: reasons.slice(0, 3),
      }
    })
    .filter((suggestion) => suggestion.score > 0)
    .sort((left, right) => right.score - left.score)
    .slice(0, 3)
}
