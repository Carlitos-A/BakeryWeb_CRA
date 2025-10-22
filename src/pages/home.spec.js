import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from '../components/Header';
import { CartProvider } from '../components/CartContext';

describe('Header', () => {
  beforeEach(() => {

    localStorage.clear();
  });

  it('Renderiza el enlace "Inicio"', () => {
    render(
      <CartProvider>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </CartProvider>
    );

    expect(screen.getByText(/Inicio/i)).toBeInTheDocument();
  });

  it('Renderiza los enlaces "Login" y "Registrarse" cuando no hay usuario logueado', () => {
    render(
      <CartProvider>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </CartProvider>
    );

    expect(screen.getByText(/Login/i)).toBeInTheDocument();
    expect(screen.getByText(/Registrarse/i)).toBeInTheDocument();
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

  it('Renderiza el enlace "Catálogo"', () => {
    render(
      <CartProvider>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </CartProvider>
    );

    expect(screen.getByText(/Catálogo/i)).toBeInTheDocument();
  });

  it('Renderiza el enlace "Comunidad"', () => {
    render(
      <CartProvider>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </CartProvider>
    );

    expect(screen.getByText(/Comunidad/i)).toBeInTheDocument();
  });
});
