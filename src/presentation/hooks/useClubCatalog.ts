import { getClubCatalogMetadata } from '../../application/clubs/use-cases/getClubCatalogMetadata'
import { getFilteredClubs } from '../../application/clubs/use-cases/getFilteredClubs'
import { getSuggestedClubs } from '../../application/clubs/use-cases/getSuggestedClubs'
import { listClubs } from '../../application/clubs/use-cases/listClubs'
import type { ClubFilters } from '../../domain/clubs/value-objects/ClubFilters'
import type { ReaderProfile } from '../../domain/profiles/entities/ReaderProfile'
import { clubRepository } from '../../infrastructure/container'

export function useClubCatalog(filters: ClubFilters, profile: ReaderProfile | null) {
  const clubs = listClubs(clubRepository)
  const filteredClubs = getFilteredClubs(clubRepository, filters)
  const suggestions = getSuggestedClubs(clubRepository, profile)
  const { availableCities, availableGenres } = getClubCatalogMetadata(clubRepository)

  return {
    clubs,
    filteredClubs,
    suggestions,
    availableCities,
    availableGenres,
    featuredClub: clubs[0] ?? null,
  }
}
