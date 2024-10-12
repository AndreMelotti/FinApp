import { render, screen, fireEvent } from '@testing-library/react'
import Finance from './page'

describe('Finance', () => {
  it('renders the heading', () => {
    render(<Finance />)
    const heading = screen.getByRole('heading', { name: /Personal Finance/i })
    expect(heading).toBeInTheDocument()
  })

  it('displays initial transactions', () => {
    render(<Finance />)
    expect(screen.getByText(/Salary/i)).toBeInTheDocument()
    expect(screen.getByText(/Rent/i)).toBeInTheDocument()
    expect(screen.getByText(/Freelance/i)).toBeInTheDocument()
    expect(screen.getByText(/Groceries/i)).toBeInTheDocument()
  })

  it('allows adding a new transaction', () => {
    render(<Finance />)
    
    fireEvent.change(screen.getByLabelText(/Type/i), { target: { value: 'income' } })
    fireEvent.change(screen.getByLabelText(/Description/i), { target: { value: 'New Income' } })
    fireEvent.change(screen.getByLabelText(/Amount/i), { target: { value: '1000' } })
    
    fireEvent.click(screen.getByRole('button', { name: /Add Transaction/i }))

    expect(screen.getByText(/New Income/i)).toBeInTheDocument()
  })

  it('calculates and displays the correct balance', () => {
    render(<Finance />)
    const balanceElement = screen.getByText(/Balance:/i).nextSibling
    expect(balanceElement).toHaveTextContent('R$ 4200.00')
  })

  it('has a link back to the home page', () => {
    render(<Finance />)
    const link = screen.getByRole('link', { name: /Back to Home/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/')
  })
})