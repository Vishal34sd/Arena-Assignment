
import { z } from "zod"

export const createArenaSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(5)
})
