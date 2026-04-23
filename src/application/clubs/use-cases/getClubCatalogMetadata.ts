import type { ClubRepository } from '../../../domain/clubs/repositories/ClubRepository'

export interface ClubCatalogMetadata {
  availableCities: string[]
  availableGenres: string[]
}

export function getClubCatalogMetadata(
  clubRepository: ClubRepository,
): ClubCatalogMetadata {
  const clubs = clubRepository.getAll()

  return {
    availableCities: Array.from(
      new Set(clubs.map((club) => club.city).filter((city) => city !== 'Online')),
    ).sort((left, right) => left.localeCompare(right)),
    availableGenres: Array.from(new Set(clubs.flatMap((club) => club.genres))).sort(
      (left, right) => left.localeCompare(right),
    ),
  }
}
