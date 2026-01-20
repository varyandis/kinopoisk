import { message } from 'antd'

type NotifyOptions = {
  key: string
  title: string
  description?: string
  duration?: number
}

const lastShown: Record<string, number> = {}

export const notifyError = ({ key, title, description, duration = 3 }: NotifyOptions) => {
  const now = Date.now()
  const prev = lastShown[key]

  if (prev && now - prev < 2000) return
  lastShown[key] = now

  const text = description ? `${title}: ${description}` : title

  message.error({
    content: text,
    duration,
  })
}
