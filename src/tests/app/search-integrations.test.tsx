import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import App from '@/app'
import { makeIntegrations } from '../factories/integrations.factory'
import { mockFetch } from '../helpers/mock-fetch'
import { renderApp } from '../helpers/render'

describe('Search integrations', () => {
  it('filters integrations by search term', async () => {
    const integrations = makeIntegrations({ count: 3 }).integrations
    mockFetch(integrations)

    const user = userEvent.setup()

    renderApp(<App />)

    const searchInput =
      await screen.findByPlaceholderText(/Buscar integração.../i)

    let cards = await screen.findAllByRole('button', { name: /integration/i })

    expect(cards).toHaveLength(3)

    await user.type(searchInput, 'Integration 2')

    cards = await screen.findAllByRole('button', { name: /integration/i })

    expect(cards).toHaveLength(1)
    expect(cards[0]).toHaveTextContent('Integration 2')
  })

  it('shows empty state when no integrations match the search', async () => {
    const integrations = makeIntegrations({ count: 3 }).integrations
    mockFetch(integrations)

    const user = userEvent.setup()

    renderApp(<App />)

    const searchInput =
      await screen.findByPlaceholderText(/Buscar integração.../i)

    let cards = await screen.findAllByRole('button', { name: /integration/i })

    expect(cards).toHaveLength(3)

    await user.type(searchInput, 'Non-existing integration')

    cards = screen.queryAllByRole('button', { name: /integration/i })

    expect(cards).toHaveLength(0)
  })
})
