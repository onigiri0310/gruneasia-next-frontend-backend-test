import { z } from 'zod'

export const CheckUsernameSchema = z.object({
  username: z.string(),
  exclude: z.string().optional(),
})

export type CheckUsername = z.infer<typeof CheckUsernameSchema>
