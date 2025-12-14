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
  onPageChange: (page: number) => void
}

type IntegrationsStore = State & Actions

export const initialIntegrationsState: State = {
  searchValue: '',
  pagination: {
    currentPage: 1,
    itemsPerPage: 12,
  },
}

export const useIntegrationsStore = create<IntegrationsStore>()(
  immer((set) => ({
    ...initialIntegrationsState,

    setSearch: (searchValue) => {
      set((state) => {
        state.searchValue = searchValue

        state.pagination.currentPage = 1
      })
    },
    onPageChange: (page) => {
      set((state) => {
        state.pagination.currentPage = page
      })
    },
  })),
)
