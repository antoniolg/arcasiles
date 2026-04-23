import { useEffect, useState } from 'react'
import type { ReaderProfile } from '../../domain/profiles/entities/ReaderProfile'
import { loadReaderProfile } from '../../application/profiles/use-cases/loadReaderProfile'
import { saveReaderProfile } from '../../application/profiles/use-cases/saveReaderProfile'
import { profileRepository } from '../../infrastructure/container'

export function useReaderProfile() {
  const [profile, setProfile] = useState<ReaderProfile | null>(() =>
    loadReaderProfile(profileRepository),
  )

  useEffect(() => {
    saveReaderProfile(profileRepository, profile)
  }, [profile])

  return {
    profile,
    saveProfile: setProfile,
  }
}
