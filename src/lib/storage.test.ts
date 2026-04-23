import { beforeEach, describe, expect, it } from 'vitest'
import { loadProfile, saveProfile } from './storage'

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
    const profile = {
      city: 'Valencia',
      favoriteGenres: ['Fantasia'],
      pace: 'mensual' as const,
      preferredModality: 'presencial' as const,
    }

    saveProfile(profile)

    expect(window.localStorage.getItem(profileStorageKey)).toBe(
      JSON.stringify(profile),
    )
    expect(loadProfile()).toEqual(profile)
  })

  it('returns null when the stored profile is malformed JSON', () => {
    window.localStorage.setItem(profileStorageKey, '{broken json')

    expect(loadProfile()).toBeNull()
  })

  it('removes the profile when saving null', () => {
    window.localStorage.setItem(profileStorageKey, JSON.stringify({ city: 'Madrid' }))

    saveProfile(null)

    expect(window.localStorage.getItem(profileStorageKey)).toBeNull()
  })
})
