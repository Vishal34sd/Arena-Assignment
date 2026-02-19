import { prisma } from "../../config/prisma"

export class ArenaRepository {
  create(data: any) {
    return prisma.arena.create({ data })
  }

  findAll() {
    return prisma.arena.findMany()
  }

  findById(id: string) {
    return prisma.arena.findUnique({ where: { id } })
  }

  join(data: any) {
    return prisma.arenaParticipant.create({ data })
  }
}
