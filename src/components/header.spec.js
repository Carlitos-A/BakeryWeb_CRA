import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import Header from './header.jsx';

// Mock del localStorage
beforeEach(() => {
  const store = {};
  spyOn(window.localStorage, 'getItem').and.callFake((key) => store[key]);
  spyOn(window.localStorage, 'setItem').and.callFake((key, value) => (store[key] = value));
  spyOn(window.localStorage, 'removeItem').and.callFake((key) => delete store[key]);
});

describe('Componente <Header />', () => {
  it('debería renderizar correctamente el logo y los enlaces principales', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    // Verifica que se muestra el logo
    const logo = screen.getByAltText('Logo');
    expect(logo).toBeInTheDocument();

    // Verifica algunos enlaces del menú
    expect(screen.getByText(/Inicio/i)).toBeInTheDocument();
    expect(screen.getByText(/Catálogo/i)).toBeInTheDocument();
    expect(screen.getByText(/Sobre Nosotros/i)).toBeInTheDocument();
  });

  it('debería mostrar opciones de login cuando no está logueado', () => {
    spyOn(window.localStorage, 'getItem').and.callFake((key) => {
      if (key === 'logueado') return 'false';
      return null;
    });

    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByText(/Login/i)).toBeInTheDocument();
    expect(screen.getByText(/Registrarse/i)).toBeInTheDocument();
  });
});
