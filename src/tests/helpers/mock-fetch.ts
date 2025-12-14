import { vi } from 'vitest'

export function mockFetch(data: unknown) {
  globalThis.fetch = vi.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve(data),
    } as Response),
  )
}
