
import { prisma } from "../../config/prisma"

export class UserRepository {
  create(data: any) {
    return prisma.user.create({ data })
  }

  findByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } })
  }

  findById(id: string) {
    return prisma.user.findUnique({ where: { id } })
  }
}
