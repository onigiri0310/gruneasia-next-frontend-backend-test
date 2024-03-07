import { z } from 'zod';
import { Timestamp } from '../others';

export const CompanySchema = z.object({
  id: z.number().optional(),
  name: z
    .string()
    .max(255)
    .regex(/^(?!null|undefined|^$).+/, {
      message: 'Required',
    }),
  email: z
    .string()
    .email()
    .regex(/^(?!null|undefined|^$).+/, {
      message: 'Required',
    }),
  postcode: z.string().max(7).regex(/^\d{7}$/, {
    message: 'Invalid postcode format',
  }),
  prefecture: z.string().max(255).nullable(),
  city: z.string().max(255).regex(/^(?!null|undefined|^$).+/, {
    message: 'Required',
  }),
  local: z.string().max(255).regex(/^(?!null|undefined|^$).+/, {
    message: 'Required',
  }),
  streetAddress: z.string().max(255).nullable(),
  businessHour: z.string().max(255).nullable(),
  regularHoliday: z.string().max(255).nullable(),
  phone: z.string().regex(/^\d+$/, {
    message: 'Invalid phone number format',
  }),
  fax: z.string().max(50).nullable(),
  url: z.string().max(255).nullable(),
  licenseNumber: z.string().max(50).nullable(),

  createdAt: Timestamp,
  updatedAt: Timestamp,
});

export type Company = z.infer<typeof CompanySchema>;
