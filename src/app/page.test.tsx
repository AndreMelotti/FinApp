import { render, screen } from '@testing-library/react'
import Home from './page'

describe('Home', () => {
  it('renders the heading', () => {
    render(<Home />)
    const heading = screen.getByRole('heading', { name: /Currency & Finance SaaS/i })
    expect(heading).toBeInTheDocument()
  })

  it('displays currency rates', () => {
    render(<Home />)
    expect(screen.getByText(/US Dollar $$USD$$/i)).toBeInTheDocument()
    expect(screen.getByText(/Euro $$EUR$$/i)).toBeInTheDocument()
    expect(screen.getByText(/Bitcoin $$BTC$$/i)).toBeInTheDocument()
  })

  it('has a link to the finance page', () => {
    render(<Home />)
    const link = screen.getByRole('link', { name: /Go to Personal Finance/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/finance')
  })
})