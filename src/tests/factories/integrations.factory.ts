import type { Integration } from '@/schemas/integration'

type MakeIntegrationsInput = {
  count?: number
}

export function makeIntegrations({ count = 1 }: MakeIntegrationsInput = {}): {
  integrations: Integration[]
} {
  return {
    integrations: Array.from({ length: count }, (_, index) => ({
      app_id: `app_id_${index + 1}`,
      name: `Integration ${index + 1}`,
      icon: `https://example.com/icon${index + 1}.png`,
      color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
      link: `https://example.com/integration${index + 1}`,
    })),
  }
}
