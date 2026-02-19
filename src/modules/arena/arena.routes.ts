import { Router } from "express"
import { ArenaController } from "./arena.controller"
import { authMiddleware } from "../../middlewares/auth.middleware"
import { validate } from "../../middlewares/validate.middleware"
import { createArenaSchema } from "./arena.schema"

const router = Router()
const controller = new ArenaController()

router.post("/", authMiddleware, validate(createArenaSchema), controller.create)
router.get("/", controller.list)
router.get("/:id", controller.get)
router.post("/:id/join", authMiddleware, controller.join)

export default router
