import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from './Header';
import { CartProvider } from './CartContext';

describe('Elementos del Header', () => {
    it('Renderiza el link "Inicio"', () => {
        render(
            <CartProvider>
                <MemoryRouter>
                    <Header />
                </MemoryRouter>
            </CartProvider>
        );

        // Verifica que el enlace "Inicio" esté presente
        expect(screen.getByText(/Inicio/i)).toBeInTheDocument();
    });

    it('Renderiza el enlace "Login" si no hay usuario logueado', () => {
        // Asegurarse que no hay usuario logueado
        localStorage.removeItem("logueado");
        localStorage.removeItem("usuario");

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
});
