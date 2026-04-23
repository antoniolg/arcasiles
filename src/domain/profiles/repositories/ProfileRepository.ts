import type { ReaderProfile } from '../entities/ReaderProfile'

export interface ProfileRepository {
  load(): ReaderProfile | null
  save(profile: ReaderProfile | null): void
}
