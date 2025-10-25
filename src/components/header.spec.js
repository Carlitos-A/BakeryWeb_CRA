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
      screen.getByText(/comunidad/i)
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


  it('Busca los links de navegación principales', () => {
    render(

      <MemoryRouter>
        <CartProvider>
          <Header />
     </CartProvider>
      </MemoryRouter>
      
    );
    // Links internos (react-router)
  expect(screen.getByRole('link', { name: /inicio/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Login/i })).toBeInTheDocument();
});

   it('Valida la configuración de como se ve el boton busqueda', () => {
    render(
      <MemoryRouter>
        <CartProvider>
          <Header />
     </CartProvider>
      </MemoryRouter>
    );
    expect(screen.getByRole('searchbox', { name: /buscar/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /buscar/i })).toBeInTheDocument();
  });

 

  it('Renderiza "Cerrar Sesión" con el nombre del usuario cuando está logueado', () => {
      localStorage.setItem("logueado", "true");
      localStorage.setItem("usuario", "Carlos");
  
      render(
        <CartProvider>
          <MemoryRouter>
            <Header />
          </MemoryRouter>
        </CartProvider>
      );
  
      expect(screen.getByText(/Cerrar Sesion \(Carlos\)/i)).toBeInTheDocument();
    });

});