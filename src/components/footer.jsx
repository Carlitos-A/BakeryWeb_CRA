import React from 'react';
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="pt-4 pb-3">
      <div className="container text-center">
        
        {/* Navegación */}
        <nav className="mb-3">
          <ul className="list-unstyled mb-0">
            <li className="mb-2">
              <Link className="text-customize text-decoration-none" to="/">
                Cómo modificar mis datos
              </Link>
            </li>
            <li className="mb-2">
              <Link className="text-customize text-decoration-none" href="/">
                Política de privacidad
              </Link>
            </li>
            <li className="mb-2">
              <Link className="text-customize text-decoration-none" to="/">
                Términos y condiciones
              </Link>
            </li>
          </ul>
        </nav>

        {/* Íconos */}
        <div className="d-flex justify-content-center gap-3 fs-4">
          <Link to="/" target="_blank" rel="noopener noreferrer" className="text-customize">
            <i className="bi bi-instagram"></i>
          </Link>
          <Link to="/" target="_blank" rel="noopener noreferrer" className="text-customize">
            <i className="bi bi-facebook"></i>
          </Link>
          <Link to="/" target="_blank" rel="noopener noreferrer" className="text-customize">
            <i className="bi bi-tiktok"></i>
          </Link>
          <Link to="/" target="_blank" rel="noopener noreferrer" className="text-customize">
            <i className="bi bi-youtube"></i>
          </Link>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center mt-3 pt-2 border-top border-secondary">
        <p className="mb-0 small">
          &copy; 2025 B2C Code - Duoc UC - Todos los derechos reservados
        </p>
      </div>
    </footer>
  );
}