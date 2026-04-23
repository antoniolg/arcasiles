import type { Club } from '../entities/Club'
import type { ClubFilters } from '../value-objects/ClubFilters'

export function filterClubs(clubs: Club[], filters: ClubFilters): Club[] {
  return clubs.filter((club) => {
    const matchesModality =
      filters.modality === 'all' || club.modality === filters.modality
    const matchesCity = filters.city === 'all' || club.city === filters.city
    const matchesGenre =
      filters.genre === 'all' || club.genres.includes(filters.genre)

    return matchesModality && matchesCity && matchesGenre
  })
}
