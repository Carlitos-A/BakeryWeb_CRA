import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from './Catalogo';
import { MemoryRouter } from 'react-router-dom';
import { CartProvider } from '../components/CartContext';

describe('Home (Card)', () => { // agrupa un conjunto de tests bajo un nombre (en este caso "Home (Card)"). Sirve para el reporte final.
  it('Busca que se renderizan 6 cards de producto', () => { // it describe el caso
    render(
    <CartProvider>
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  </CartProvider>

); // Render monta el componente en DOM virtual.
    const cards = screen.getAllByTestId('producto'); // Busca todos los elementos con data-testid="producto"
    expect(cards.length).toBe(25); // Valida que existan exactamente 6 cards renderizadas
  });

  it('Busca 6 títulos (h6) de producto', () => { 
    render(
   <MemoryRouter>
          <CartProvider>
          <Home />
          </CartProvider>
        </MemoryRouter>
  );
    const titles = screen.getAllByRole('heading', { level: 6 }); // Busca por rol "heading" nivel 5 (equivale a <h5>)
    expect(titles.length).toBe(25);
  });

  it('Busca un producto específico por su título', () => {
    render(
  
        <MemoryRouter>
          <CartProvider>
          <Home />
          </CartProvider>
        </MemoryRouter>
 

    
  );
    expect(screen.getByRole('heading', { name: 'Torta Vegana de Chocolate', level: 6 })) // Busca un texto exacto en el contenido
      .toBeInTheDocument(); //Verifica que el elemento (nombre buscado) existe en el DOM renderizado.
  });
});
/*
describe('Elementos del Home', () => {
  it('Busca titulo de productos', async () => {
    render(
  
          <CartProvider>
          <Home />
          </CartProvider>
      
    
  );
    const titulo = await screen.findByText(/Todos los productos/i);
    expect(titulo).toBeInTheDocument();
  }); 
});*/