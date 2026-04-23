import type { Club } from '../entities/Club'

export interface ClubRepository {
  getAll(): Club[]
  getById(id: string): Club | null
}
