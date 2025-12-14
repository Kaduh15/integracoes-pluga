import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import App from '@/app'
import { makeIntegrations } from '../factories/integrations.factory'
import { mockFetch } from '../helpers/mock-fetch'
import { renderApp } from '../helpers/render'

describe('Integration modal', () => {
  it('opens the modal when an integration card is clicked', async () => {
    const integrations = makeIntegrations({ count: 2 }).integrations
    mockFetch(integrations)

    renderApp(<App />)

    const user = userEvent.setup()

    const cards = await screen.findAllByRole('button', { name: /integration/i })

    await user.click(cards[0])

    const modal = await screen.findByRole('dialog')

    expect(modal).toBeVisible()
  })

  it('displays the selected integration details', async () => {
    const integrations = makeIntegrations({ count: 2 }).integrations
    mockFetch(integrations)

    renderApp(<App />)

    const user = userEvent.setup()

    const cards = await screen.findAllByRole('button', { name: /integration/i })

    await user.click(cards[1])

    const modal = await screen.findByRole('dialog')

    expect(modal).toBeVisible()
    expect(modal).toHaveTextContent('Integration 2')
  })
  it('closes the modal when clicking the close button', async () => {
    const integrations = makeIntegrations({ count: 2 }).integrations
    mockFetch(integrations)

    renderApp(<App />)

    const user = userEvent.setup()

    const cards = await screen.findAllByRole('button', { name: /integration/i })

    await user.click(cards[0])

    const modal = await screen.findByRole('dialog')

    expect(modal).toBeVisible()

    const closeButton = screen.getByRole('button', { name: /close modal/i })

    await user.click(closeButton)

    expect(modal).not.toBeInTheDocument()
  })
})
