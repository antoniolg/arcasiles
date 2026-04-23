import type { Club } from '../../../domain/clubs/entities/Club'
import type { ClubRepository } from '../../../domain/clubs/repositories/ClubRepository'

export function listClubs(clubRepository: ClubRepository): Club[] {
  return clubRepository.getAll()
}
