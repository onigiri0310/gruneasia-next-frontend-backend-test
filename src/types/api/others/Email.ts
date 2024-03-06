import { z } from 'zod'

export const Email = z.string().email()
export type Email = z.infer<typeof Email>

export const EmailOptional = z.string().email().optional()
export type EmailOptional = z.infer<typeof EmailOptional>
