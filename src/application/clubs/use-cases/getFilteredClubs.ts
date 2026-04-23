import type { Club } from '../../../domain/clubs/entities/Club'
import type { ClubRepository } from '../../../domain/clubs/repositories/ClubRepository'
import { filterClubs } from '../../../domain/clubs/services/filterClubs'
import type { ClubFilters } from '../../../domain/clubs/value-objects/ClubFilters'

export function getFilteredClubs(
  clubRepository: ClubRepository,
  filters: ClubFilters,
): Club[] {
  return filterClubs(clubRepository.getAll(), filters)
}
