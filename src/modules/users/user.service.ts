import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { AppError } from "../../utils/error"
import { UserRepository } from "./user.repository"

export class UserService {
  private repo = new UserRepository()

  async register(data: any) {
    const existing = await this.repo.findByEmail(data.email)
    if (existing) throw new AppError("Email already exists", 400)

    const hashed = await bcrypt.hash(data.password, 10)

    const user = await this.repo.create({
      ...data,
      password: hashed
    })

    return user
  }

  async login(data: any) {
    const user = await this.repo.findByEmail(data.email)
    if (!user) throw new AppError("Invalid credentials", 400)

    const valid = await bcrypt.compare(data.password, user.password)
    if (!valid) throw new AppError("Invalid credentials", 400)

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string)

    return { token }
  }

  async profile(userId: string) {
    const user = await this.repo.findById(userId)
    if (!user) throw new AppError("User not found", 404)
    return user
  }
}
