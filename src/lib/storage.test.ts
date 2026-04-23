import { beforeEach, describe, expect, it } from 'vitest'
import { loadReaderProfile } from '../application/profiles/use-cases/loadReaderProfile'
import { saveReaderProfile } from '../application/profiles/use-cases/saveReaderProfile'
import { LocalStorageProfileRepository } from '../infrastructure/profiles/repositories/LocalStorageProfileRepository'

const profileStorageKey = 'arcasiles.reader-profile'

function createLocalStorageMock() {
  const storage = new Map<string, string>()

  return {
    getItem(key: string) {
      return storage.get(key) ?? null
    },
    setItem(key: string, value: string) {
      storage.set(key, value)
    },
    removeItem(key: string) {
      storage.delete(key)
    },
    clear() {
      storage.clear()
    },
  }
}

describe('storage', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {
      configurable: true,
      value: createLocalStorageMock(),
    })
  })

  it('persists and restores a reader profile', () => {
    const profileRepository = new LocalStorageProfileRepository()
    const profile = {
      city: 'Valencia',
      favoriteGenres: ['Fantasia'],
      pace: 'mensual' as const,
      preferredModality: 'presencial' as const,
    }

    saveReaderProfile(profileRepository, profile)

    expect(window.localStorage.getItem(profileStorageKey)).toBe(
      JSON.stringify(profile),
    )
    expect(loadReaderProfile(profileRepository)).toEqual(profile)
  })

  it('returns null when the stored profile is malformed JSON', () => {
    const profileRepository = new LocalStorageProfileRepository()
    window.localStorage.setItem(profileStorageKey, '{broken json')

    expect(loadReaderProfile(profileRepository)).toBeNull()
  })

  it('removes the profile when saving null', () => {
    const profileRepository = new LocalStorageProfileRepository()
    window.localStorage.setItem(profileStorageKey, JSON.stringify({ city: 'Madrid' }))

    saveReaderProfile(profileRepository, null)

    expect(window.localStorage.getItem(profileStorageKey)).toBeNull()
  })
})
