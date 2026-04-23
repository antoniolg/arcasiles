import type { Club } from '../../../domain/clubs/entities/Club'
import type { ClubRepository } from '../../../domain/clubs/repositories/ClubRepository'

export class InMemoryClubRepository implements ClubRepository {
  private readonly clubs: Club[]

  constructor(clubs: Club[]) {
    this.clubs = clubs
  }

  getAll(): Club[] {
    return [...this.clubs]
  }

  getById(id: string): Club | null {
    return this.clubs.find((club) => club.id === id) ?? null
  }
}
