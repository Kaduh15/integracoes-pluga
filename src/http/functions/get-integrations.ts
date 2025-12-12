import { integrationSchema } from '@/schemas/integration'
import { httpGet } from '..'

export async function getIntegrations() {
  const response = await httpGet('https://pluga.co/ferramentas_search.json')

  const data = integrationSchema.array().safeParse(response)

  if (!data.success) {
    throw new Error('Invalid data format')
  }

  return data.data
}
