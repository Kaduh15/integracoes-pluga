import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

type State = {
  history: {
    name: string
    icon: string
  }[]
}

type Actions = {
  addHistory: ({ name, icon }: { name: string; icon: string }) => void
}

type HistoryStore = {
  actions: Actions
  state: State
}

export const useHistoryStore = create<HistoryStore>()(
  immer((set) => ({
    state: {
      history: [],
    },

    actions: {
      addHistory: ({ name, icon }: { name: string; icon: string }) => {
        set(({ state }) => {
          const indexIntegration = state.history.findIndex(
            (item) => item.name === name && item.icon === icon,
          )

          if (indexIntegration !== -1) {
            state.history.splice(indexIntegration, 1)
          }

          state.history.push({ name, icon })

          if (state.history.length > 3) {
            state.history.shift()
          }
        })
      },
    },
  })),
)
