import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

type State = {
  historyViewer: {
    name: string
    icon: string
  }[]
}

type Actions = {
  addHistory: ({ name, icon }: { name: string; icon: string }) => void
  getHistory: () => {
    name: string
    icon: string
  }[]
}

type HistoryViewerStore = {
  actions: Actions
  state: State
}

export const useHistoryViewerStore = create<HistoryViewerStore>()(
  immer((set, get) => ({
    state: {
      historyViewer: [],
    },

    actions: {
      addHistory: ({ name, icon }: { name: string; icon: string }) => {
        set(({ state }) => {
          state.historyViewer.push({ name, icon })

          state.historyViewer = state.historyViewer.slice(-3).reverse()
        })
      },
      getHistory: () => {
        const history = get().state.historyViewer || [];

        return history
      },
    },
  })),
)
