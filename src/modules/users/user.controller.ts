import { Request, Response } from "express"
import { successResponse } from "../../utils/response"
import { UserService } from "./user.service"
import { AuthRequest } from "../../middlewares/auth.middleware"

export class UserController {
  private service = new UserService()

  register = async (req: Request, res: Response) => {
    const user = await this.service.register(req.body)
    res.json(successResponse(user))
  }

  login = async (req: Request, res: Response) => {
    const data = await this.service.login(req.body)
    res.json(successResponse(data))
  }

  profile = async (req: AuthRequest, res: Response) => {
    const user = await this.service.profile(req.user!.id)
    res.json(successResponse(user))
  }
}
