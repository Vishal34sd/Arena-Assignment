import { AppError } from "../../utils/error"
import { ArenaRepository } from "./arena.repository"

export class ArenaService {
  private repo = new ArenaRepository()

  async create(userId: string, data: any) {
    return this.repo.create({
      ...data,
      createdBy: userId
    })
  }

  async list() {
    return this.repo.findAll()
  }

  async get(id: string) {
    const arena = await this.repo.findById(id)
    if (!arena) throw new AppError("Arena not found", 404)
    return arena
  }

  async join(userId: string, arenaId: string) {
    const arena = await this.repo.findById(arenaId)
    if (!arena) throw new AppError("Arena not found", 404)

    return this.repo.join({
      userId,
      arenaId
    })
  }
}
