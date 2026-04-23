import type { Club } from '../../../domain/clubs/entities/Club'
import type { ClubRepository } from '../../../domain/clubs/repositories/ClubRepository'

export function getClubById(
  clubRepository: ClubRepository,
  clubId: string,
): Club | null {
  return clubRepository.getById(clubId)
}
