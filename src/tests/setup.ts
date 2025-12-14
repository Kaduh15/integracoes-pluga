import { initialHistoryState, useHistoryStore } from '@/stores/history.store'
import {
  initialIntegrationsState,
  useIntegrationsStore,
} from '@/stores/integrations.store'
import {
  initialSelectIntegrationState,
  useSelectedIntegrationStore,
} from '@/stores/select-integration.store'
import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach, beforeEach, vi } from 'vitest'

// runs a clean after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup()

  useIntegrationsStore.setState(initialIntegrationsState)
  useSelectedIntegrationStore.setState(initialSelectIntegrationState)
  useHistoryStore.setState(initialHistoryState)
})

beforeEach(() => {
  vi.clearAllMocks()
})
