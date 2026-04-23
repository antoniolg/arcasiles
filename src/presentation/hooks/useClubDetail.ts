import { getClubById } from '../../application/clubs/use-cases/getClubById'
import { suggestClubs } from '../../domain/clubs/services/suggestClubs'
import type { ReaderProfile } from '../../domain/profiles/entities/ReaderProfile'
import { clubRepository } from '../../infrastructure/container'

export function useClubDetail(clubId: string | undefined, profile: ReaderProfile | null) {
  const club = clubId ? getClubById(clubRepository, clubId) : null
  const relatedSuggestion = club ? suggestClubs([club], profile)[0] ?? null : null

  return {
    club,
    relatedSuggestion,
  }
}
