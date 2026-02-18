import { Router } from "express"
import { UserController } from "./user.controller"
import { validate } from "../../middlewares/validate.middleware"
import { registerSchema, loginSchema } from "./user.schema"
import { authMiddleware } from "../../middlewares/auth.middleware"

const router = Router()
const controller = new UserController()

router.post("/register", validate(registerSchema), controller.register)
router.post("/login", validate(loginSchema), controller.login)
router.get("/profile", authMiddleware, controller.profile)

export default router
