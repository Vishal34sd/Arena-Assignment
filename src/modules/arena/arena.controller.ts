import { Request, Response } from "express"
import { ArenaService } from "./arena.service"
import { successResponse } from "../../utils/response"
import { AuthRequest } from "../../middlewares/auth.middleware"
import { AppError } from "../../utils/error"

interface IdParams {
  id: string
}

export class ArenaController {
  private service = new ArenaService()

  create = async (req: AuthRequest, res: Response) => {
    if (!req.user?.id) {
      throw new AppError("Unauthorized", 401)
    }

    const arena = await this.service.create(req.user.id, req.body)
    return res.json(successResponse(arena))
  }

  list = async (_req: Request, res: Response) => {
    const arenas = await this.service.list()
    return res.json(successResponse(arenas))
  }

  get = async (req: Request<IdParams>, res: Response) => {
    const { id } = req.params

    const arena = await this.service.get(id)
    return res.json(successResponse(arena))
  }

  join = async (
    req: AuthRequest & Request<IdParams>,
    res: Response
  ) => {
    if (!req.user?.id) {
      throw new AppError("Unauthorized", 401)
    }

    const { id } = req.params

    const result = await this.service.join(req.user.id, id)
    return res.json(successResponse(result))
  }
}
