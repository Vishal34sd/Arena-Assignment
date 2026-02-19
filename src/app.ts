import express from "express"
import userRoutes from "./modules/users/user.routes"
import arenaRoutes from "./modules/arena/arena.routes"
import { errorMiddleware } from "./middlewares/error.middleware"

const app = express()

app.use(express.json())

app.use("/api/users", userRoutes)
app.use("/api/arenas", arenaRoutes)

app.use(errorMiddleware)

export default app
