import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from '@/app'
import { makeIntegrations } from '../factories/integrations.factory'
import { mockFetch } from '../helpers/mock-fetch'
import { renderApp } from '../helpers/render'
import userEvent from '@testing-library/user-event'

describe('Pagination', () => {
  it('shows the first page of integrations by default', async () => {
    const integrations = makeIntegrations({ count: 25 }).integrations
    mockFetch(integrations)

    renderApp(<App />)

    const cards = await screen.findAllByRole('button', { name: /integration/i })

    expect(cards).toHaveLength(12)
    expect(cards[0]).toHaveTextContent('Integration 1')
    expect(cards[11]).toHaveTextContent('Integration 12')
  })

  it('changes the displayed integrations when clicking next page', async () => {
    const integrations = makeIntegrations({ count: 25 }).integrations
    mockFetch(integrations)

    renderApp(<App />)

    const user = userEvent.setup()

    const nextButton = await screen.findByLabelText(/next page/i)

    await user.click(nextButton)

    const cards = await screen.findAllByRole('button', { name: /integration/i })

    expect(cards).toHaveLength(12)
    expect(cards[0]).toHaveTextContent('Integration 13')
    expect(cards[11]).toHaveTextContent('Integration 24')
  })
})
