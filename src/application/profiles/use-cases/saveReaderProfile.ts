import type { ReaderProfile } from '../../../domain/profiles/entities/ReaderProfile'
import type { ProfileRepository } from '../../../domain/profiles/repositories/ProfileRepository'

export function saveReaderProfile(
  profileRepository: ProfileRepository,
  profile: ReaderProfile | null,
): void {
  profileRepository.save(profile)
}
