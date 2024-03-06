import { z } from 'zod'
import { Timestamp } from '../others'

export const UserSchema = z.object({
    id: z.number().optional(),
    username: z
      .string()
      .max(255)
      .regex(/^(?!null|undefined|^$).+/, {
        message: 'Required',
      }),
    name: z
      .string()
      .max(255)
      .nullish(),
    email: z
      .string()
      .email()
      .regex(/^(?!null|undefined|^$).+/, {
        message: 'Required',
      }),
    age: z.number().nullish(),
    gender: z.number().nullish(),

    createdAt: Timestamp,
    updatedAt: Timestamp
  })

export type User = z.infer<typeof UserSchema>
