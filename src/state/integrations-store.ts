import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

type State = {
  searchValue: string
  pagination: {
    currentPage: number
    itemsPerPage: number
  }
}

type Actions = {
  setSearch: (searchValue: string) => void
  nextPage: (lastPage?: number) => void
  previousPage: () => void
}

type IntegrationsStore = {
  actions: Actions
  state: State
}

export const useIntegrationsStore = create<IntegrationsStore>()(
  immer((set) => ({
    state: {
      searchValue: '',
      pagination: {
        currentPage: 1,
        itemsPerPage: 12,
      },
    },

    actions: {
      setSearch: (searchValue) => {
        set(({ state }) => {
          state.searchValue = searchValue
        })
      },
      nextPage: (lastPage) => {
        set(({ state }) => {
          state.pagination.currentPage += 1
          if (lastPage && state.pagination.currentPage > lastPage) {
            state.pagination.currentPage = lastPage
          }
        })
      },
      previousPage: () => {
        set(({ state }) => {
          state.pagination.currentPage -= 1

          if (state.pagination.currentPage < 1) {
            state.pagination.currentPage = 1
          }
        })
      },
    },
  })),
)
