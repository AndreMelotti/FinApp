import { render, screen, fireEvent } from '@testing-library/react'
import Finance from './page'

describe('Finance', () => {
  it('renders the heading', () => {
    render(<Finance />)
    const heading = screen.getByRole('heading', { name: /Finanças Pessoais/i })
    expect(heading).toBeInTheDocument()
  })

  it('displays initial transactions', () => {
    render(<Finance />)
    expect(screen.getByText(/Salário/i)).toBeInTheDocument()
    expect(screen.getByText(/Aluguel/i)).toBeInTheDocument()
    expect(screen.getByText(/Freelance/i)).toBeInTheDocument()
    expect(screen.getByText(/Mercado/i)).toBeInTheDocument()
  })

  it('allows adding a new transaction', () => {
    render(<Finance />)
    
    fireEvent.change(screen.getByLabelText(/Tipo/i), { target: { value: 'income' } })
    fireEvent.change(screen.getByLabelText(/Descrição/i), { target: { value: 'New Income' } })
    fireEvent.change(screen.getByLabelText(/Valor/i), { target: { value: '1000' } })
    
    fireEvent.click(screen.getByRole('button', { name: /Adicionar Transação/i }))

    expect(screen.getByText(/Adicionar Transação/i)).toBeInTheDocument()
  })

  it('calculates and displays the correct balance', () => {
    render(<Finance />)
    const balanceElement = screen.getByText(/Saldo:/i).nextSibling
    expect(balanceElement).toHaveTextContent('R$ 4200.00')
  })

  it('has a link back to the home page', () => {
    render(<Finance />)
    const link = screen.getByRole('link', { name: /Voltar para Página Inicial/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/')
  })
})