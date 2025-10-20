import React from 'react'

export default function Footer() {
  return (
    <footer className="pt-4 pb-3">
      <div className="container text-center">
        
        {/* Navegación */}
        <nav className="mb-3">
          <ul className="list-unstyled mb-0">
            <li className="mb-2">
              <a className="text-customize text-decoration-none" href="#">
                Cómo modificar mis datos
              </a>
            </li>
            <li className="mb-2">
              <a className="text-customize text-decoration-none" href="#">
                Política de privacidad
              </a>
            </li>
            <li className="mb-2">
              <a className="text-customize text-decoration-none" href="#">
                Términos y condiciones
              </a>
            </li>
          </ul>
        </nav>

        {/* Íconos */}
        <div className="d-flex justify-content-center gap-3 fs-4">
          <a href="#" target="_blank" className="text-customize">
            <i className="bi bi-instagram"></i>
          </a>
          <a href="#" target="_blank" className="text-customize">
            <i className="bi bi-facebook"></i>
          </a>
          <a href="#" target="_blank" className="text-customize">
            <i className="bi bi-tiktok"></i>
          </a>
          <a href="#" target="_blank" className="text-customize">
            <i className="bi bi-youtube"></i>
          </a>
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