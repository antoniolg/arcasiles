import type { ReaderProfile } from '../../../domain/profiles/entities/ReaderProfile'
import type { ProfileRepository } from '../../../domain/profiles/repositories/ProfileRepository'

export function loadReaderProfile(
  profileRepository: ProfileRepository,
): ReaderProfile | null {
  return profileRepository.load()
}
