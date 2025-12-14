import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import App from '@/app'

import { makeIntegrations } from '../factories/integrations.factory'
import { mockFetch } from '../helpers/mock-fetch'
import { renderApp } from '../helpers/render'

describe('Integrations list', () => {
  it('renders one card per integration returned by the API', async () => {
    mockFetch(makeIntegrations({ count: 2 }).integrations)

    renderApp(<App />)

    const card = await screen.findAllByRole('button', { name: /integration/i })

    expect(card).toHaveLength(2)

    expect(card[0]).toBeVisible()
    expect(card[1]).toBeVisible()
  })
})
