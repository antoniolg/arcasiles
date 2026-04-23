import type { ReaderProfile } from '../../../domain/profiles/entities/ReaderProfile'
import type { ProfileRepository } from '../../../domain/profiles/repositories/ProfileRepository'

const PROFILE_STORAGE_KEY = 'arcasiles.reader-profile'

export class LocalStorageProfileRepository implements ProfileRepository {
  load(): ReaderProfile | null {
    const storedValue = window.localStorage.getItem(PROFILE_STORAGE_KEY)

    if (!storedValue) {
      return null
    }

    try {
      return JSON.parse(storedValue) as ReaderProfile
    } catch {
      return null
    }
  }

  save(profile: ReaderProfile | null): void {
    if (!profile) {
      window.localStorage.removeItem(PROFILE_STORAGE_KEY)
      return
    }

    window.localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile))
  }
}
