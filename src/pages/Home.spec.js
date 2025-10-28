import React from 'react';
import { render, screen } from '@testing-library/react';
import Catalogo from './Catalogo';
import { MemoryRouter } from 'react-router-dom';
import { CartProvider } from '../components/CartContext';

describe('Home (Card)', () => { 
  it('Busca que se renderizan 6 cards de producto', () => { 
    render(
    <CartProvider>
    <MemoryRouter>
      <Catalogo />
    </MemoryRouter>
  </CartProvider>

); 
    const cards = screen.getAllByTestId('producto'); 
    expect(cards.length).toBe(25); 
  });

  it('Busca 6 títulos (h6) de producto', () => { 
    render(
   <MemoryRouter>
          <CartProvider>
          <Catalogo />
          </CartProvider>
        </MemoryRouter>
  );
    const titles = screen.getAllByRole('heading', { level: 6 }); 
    expect(titles.length).toBe(25);
  });

  it('Busca un producto específico por su título', () => {
    render(
  
        <MemoryRouter>
          <CartProvider>
          <Catalogo />
          </CartProvider>
        </MemoryRouter>
 
  );
    expect(screen.getByRole('heading', { name: 'Torta Vegana de Chocolate', level: 6 })) 
      .toBeInTheDocument(); 
  });
});




