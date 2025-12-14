import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import type { Integration } from '@/schemas/integration'

type State = {
  items: Integration[]
}

type Actions = {
  add: (integration: Integration) => void
}

type HistoryStore = State & Actions

export const initialHistoryState: State = {
  items: [],
}

export const useHistoryStore = create<HistoryStore>()(
  immer((set) => ({
    ...initialHistoryState,

    add: (integration) => {
      set((state) => {
        const exists = state.items.find(
          (item) => item.app_id === integration.app_id,
        )

        if (exists) {
          state.items = state.items.filter(
            (item) => item.app_id !== integration.app_id,
          )
        }

        state.items.unshift(integration)

        if (state.items.length > 3) {
          state.items.pop()
        }
      })
    },
  })),
)
