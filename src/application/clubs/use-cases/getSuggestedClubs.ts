import type { ClubRepository } from '../../../domain/clubs/repositories/ClubRepository'
import { suggestClubs } from '../../../domain/clubs/services/suggestClubs'
import type { ClubSuggestion } from '../../../domain/clubs/value-objects/ClubSuggestion'
import type { ReaderProfile } from '../../../domain/profiles/entities/ReaderProfile'

export function getSuggestedClubs(
  clubRepository: ClubRepository,
  profile: ReaderProfile | null,
): ClubSuggestion[] {
  return suggestClubs(clubRepository.getAll(), profile)
}
