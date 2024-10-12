import { render, screen, waitFor } from '@testing-library/react'
import Home from './page'

const mockedFetch = jest.fn() as jest.Mock;
(global as any).fetch = mockedFetch;

const mockCurrencyData = {
  USDBRL: { high: '5.20' },
  EURBRL: { high: '6.10' },
  BTCBRL: { high: '150000.00' }
}

describe('Home', () => {
  beforeEach(() => {
    mockedFetch.mockClear();
    mockedFetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockCurrencyData)
    });
  })

  it('renders the heading', async () => {
    render(<Home />)
    const heading = screen.getByRole('heading', { name: /Monetrix/i })
    expect(heading).toBeInTheDocument()
  })

  it('displays fetched currency rates', async () => {
    render(<Home />)
    
    await waitFor(() => {
      expect(screen.getByText('Dólar EUA (USD)')).toBeInTheDocument()
      expect(screen.getByText('Euro (EUR)')).toBeInTheDocument()
      expect(screen.getByText('Bitcoin (BTC)')).toBeInTheDocument()
    })

    // await waitFor(() => {
    //   expect(screen.getByText((content, element) => content.startsWith('R$') && content.includes('5.20'))).toBeInTheDocument()
    //   expect(screen.getByText((content, element) => content.startsWith('R$') && content.includes('6.10'))).toBeInTheDocument()
    //   expect(screen.getByText((content, element) => content.startsWith('R$') && content.includes('150000.00'))).toBeInTheDocument()
    // })
  })

  it('has a link to the finance page', async () => {
    render(<Home />)
    const link = screen.getByRole('link', { name: /Finanças Pessoais/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/finance')
  })
})
