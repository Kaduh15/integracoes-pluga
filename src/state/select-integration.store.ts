import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import type { Integration } from '@/schemas/integration'

type SelectIntegrationState = {
  selected: Integration | null
}

type SelectIntegrationActions = {
  select: (integration: Integration) => void
  clear: () => void
}

type SelectIntegrationStore = SelectIntegrationState & SelectIntegrationActions

export const useSelectedIntegrationStore = create<SelectIntegrationStore>()(
  immer((set) => ({
    selected: null,

    select: (integration) => {
      set((state) => {
        state.selected = integration
      })
    },

    clear: () => {
      set((state) => {
        state.selected = null
      })
    },
  })),
)
