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

export const initialSelectIntegrationState: SelectIntegrationState = {
  selected: null,
}

export const useSelectedIntegrationStore = create<SelectIntegrationStore>()(
  immer((set) => ({
    ...initialSelectIntegrationState,

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
