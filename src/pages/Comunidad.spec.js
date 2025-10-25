import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Comunidad from '../pages/Comunidad';

describe('Componente Comunidad', () => {

  it('se renderiza sin errores', () => {
    render(
      <MemoryRouter>
        <Comunidad />
      </MemoryRouter>
    );
    expect(screen.getByText(/Bienvenido a la Baker Community/i)).toBeInTheDocument();
  });

  it('muestra el título principal', () => {
    render(
      <MemoryRouter>
        <Comunidad />
      </MemoryRouter>
    );
    const titulo = screen.getByRole('heading', { level: 1 });
    expect(titulo).toHaveTextContent(/Bienvenido a la Baker Community/i);
  });

  it('muestra la descripción de la comunidad', () => {
    render(
      <MemoryRouter>
        <Comunidad />
      </MemoryRouter>
    );
    const descripcion = screen.getByText(/Encuentra todo lo necesario para aprender/i);
    expect(descripcion).toBeInTheDocument();
  });

  it('muestra el enlace Gastronomía Blog', () => {
    render(
      <MemoryRouter>
        <Comunidad />
      </MemoryRouter>
    );
    const link = screen.getByRole('link', { name: /Gastronomía Blog/i });
    expect(link).toBeInTheDocument();
    expect(link.getAttribute('href')).toBe('/bakeryBlog');
  });

  it('muestra el enlace Bakery News', () => {
    render(
      <MemoryRouter>
        <Comunidad />
      </MemoryRouter>
    );
    const link = screen.getByRole('link', { name: /Bakery News/i });
    expect(link).toBeInTheDocument();
    expect(link.getAttribute('href')).toBe('/bakeryNews');
  });

  it('muestra el enlace Consejos Bakery', () => {
    render(
      <MemoryRouter>
        <Comunidad />
      </MemoryRouter>
    );
    const link = screen.getByRole('link', { name: /Consejos Bakery/i });
    expect(link).toBeInTheDocument();
    expect(link.getAttribute('href')).toBe('/bakeryConsejos');
  });

  it('muestra el enlace Recetas Chilenas', () => {
    render(
      <MemoryRouter>
        <Comunidad />
      </MemoryRouter>
    );
    const link = screen.getByRole('link', { name: /Recetas Chilenas/i });
    expect(link).toBeInTheDocument();
    expect(link.getAttribute('href')).toBe('/RecetasCHilenas');
  });

  it('renderiza el iframe de noticias', () => {
    render(
      <MemoryRouter>
        <Comunidad />
      </MemoryRouter>
    );
    const iframe = screen.getByTitle(/BioBio Noticias/i);
    expect(iframe).toBeInTheDocument();
    expect(iframe.getAttribute('src')).toContain('biobiochile.cl');
  });

  it('muestra el título de sección de comentarios', () => {
    render(
      <MemoryRouter>
        <Comunidad />
      </MemoryRouter>
    );
    const titulo = screen.getByText(/Déjanos tu consulta o comentario/i);
    expect(titulo).toBeInTheDocument();
  });

  it('renderiza el textarea para comentarios', () => {
    render(
      <MemoryRouter>
        <Comunidad />
      </MemoryRouter>
    );
    const textarea = screen.getByPlaceholderText(/Escribe tu mensaje aquí/i);
    expect(textarea).toBeInTheDocument();
  });

  it('renderiza el botón de enviar comentario', () => {
    render(
      <MemoryRouter>
        <Comunidad />
      </MemoryRouter>
    );
    const boton = screen.getByRole('button', { name: /Enviar/i });
    expect(boton).toBeInTheDocument();
  });

});
