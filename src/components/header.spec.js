import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from './header';
import { CartProvider } from './CartContext';
import EmblaCarousel from './EmblaCarousel';


describe('EmblaCarousel', () => {
  it('permite agregar productos al carrito', () => {
    render(
      <CartProvider>
        <EmblaCarousel />
      </CartProvider>
    );

    // aquí irían tus expectativas
    // por ejemplo: buscar un botón de "Agregar al carrito"
    expect(screen.getAllByText(/agregar/i).length).toBeGreaterThan(0);
  });
});


describe('Elementos del Header', () => {
  it('Busca el Nav de comunidad', () => {
    render(
      <CartProvider>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </CartProvider>
    );
    expect(
      screen.getByText(/Comunidad/i)
    ).toBeInTheDocument();
  });

  it('Busca que la imagen tenga descripción', () => {
    render(
      <CartProvider>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </CartProvider>
    );
    expect(
      screen.getByRole('img', { name: /logo pastelería/i })
    ).toBeInTheDocument();
  });
/*
  it('Busca los links de navegación principales', () => {
    render(

      <MemoryRouter>
        <CartProvider>
          <Header />
     </CartProvider>
      </MemoryRouter>
      
    );

    // Links internos (react-router)
expect(screen.getByRole('link', { name: /catalogo/i })).toBeInTheDocument();
expect(screen.getByRole('link', { name: /comunidad/i })).toBeInTheDocument();
expect(screen.getByRole('link', { name: /login/i })).toBeInTheDocument();
expect(screen.getByRole('link', { name: /cart/i })).toBeInTheDocument();


    // Link externo: Blogs y Noticias
    /*const noticias = screen.getByRole('link', { name: /blogs y noticias/i });
    const href = noticias.getAttribute('href');
    expect(href).toContain('duoc.cl/noticias');
    });
it('Valida la configuración de como se ve el boton busqueda', () => {
  render(
    <CartProvider>
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    </CartProvider>
  );

  // Validar input de búsqueda
  expect(screen.getByRole('searchbox', { name: /buscar/i })).toBeInTheDocument();

  // Validar botón de búsqueda
  expect(screen.getByRole('button', { name: /buscar/i })).toBeInTheDocument();
});*/
});