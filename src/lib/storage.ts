import type { ReaderProfile } from '../types'

const PROFILE_STORAGE_KEY = 'arcasiles.reader-profile'

export function loadProfile(): ReaderProfile | null {
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

export function saveProfile(profile: ReaderProfile | null) {
  if (!profile) {
    window.localStorage.removeItem(PROFILE_STORAGE_KEY)
    return
  }

  window.localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile))
}
