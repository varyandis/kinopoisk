import type { z } from 'zod'
import { notifyError } from '@/shared/lib/notify/notifyError'

export const parseWithZod = <T>(schema: z.ZodType<T>, raw: unknown, key: string): T => {
  const res = schema.safeParse(raw)

  if (!res.success) {
    notifyError({
      key: `zod_${key}`,
      title: 'Response validation failed',
      description: `Invalid data for "${key}" endpoint.`,
    })
    throw new Error(`Zod validation failed: ${key}`)
  }

  return res.data
}
