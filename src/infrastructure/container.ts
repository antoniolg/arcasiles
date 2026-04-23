import { InMemoryClubRepository } from './clubs/repositories/InMemoryClubRepository'
import { inMemoryClubs } from './clubs/data-sources/inMemoryClubs'
import { LocalStorageProfileRepository } from './profiles/repositories/LocalStorageProfileRepository'

export const clubRepository = new InMemoryClubRepository(inMemoryClubs)
export const profileRepository = new LocalStorageProfileRepository()
