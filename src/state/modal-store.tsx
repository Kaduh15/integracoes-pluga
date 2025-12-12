import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

type ModalState = {
  data: {
    name: string
    icon: string
  } | null
}

type ModalActions = {
  addData: ({ name, icon }: { name: string; icon: string }) => void
}

type ModalStore = {
  actions: ModalActions
  state: ModalState
}

export const useModalStore = create<ModalStore>()(
  immer((set) => ({
    state: {
      data: null,
    },

    actions: {
      addData: ({ name, icon }: { name: string; icon: string }) => {
        set(({ state }) => {
          state.data = { name, icon }
        })
      },
    },
  })),
)
