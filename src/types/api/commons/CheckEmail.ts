import { z } from 'zod'
import { Email, EmailOptional } from '../others'

export const CheckEmailSchema = z.object({
  email: Email,
  exclude: EmailOptional,
})

export type CheckEmail = z.infer<typeof CheckEmailSchema>
