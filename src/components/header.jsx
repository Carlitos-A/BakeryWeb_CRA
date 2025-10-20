
import React, { useState } from 'react'
import { catalogoItems } from '../constantes/catalogoItems';
import CartIcon from './CartIcon';
import { Link } from "react-router-dom";


export default function Header() {
  const logueado = localStorage.getItem("logueado") === "true";
  const user = localStorage.getItem("usuario");
  const [showLogoutModal, setShowLogoutModal] = useState(false);


  const openLogoutModal = () => {
    setShowLogoutModal(true);
  };

  const closeLogoutModal = () => {
    setShowLogoutModal(false);
  };
  const confirmLogout = () => {
    localStorage.removeItem("logueado");
    localStorage.removeItem("usuario");
    setShowLogoutModal(false);
    window.location.href = "/";
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg shadow-sm position-relative">
        <div className="container-fluid">
   
          <a className="navbar-brand" href="/">
            <img src="assets/img/icons/logo.png" alt="Logo" height="80" />
          </a>


          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarContent"
            aria-controls="navbarContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarContent">
            {/* Menú central */}
            <ul className="navbar-nav mb-2 mb-lg-0 central-menu">
              <li className="nav-item">
                <a className="nav-link" href="/">
                  Inicio
                </a>
              </li>

              <li className="nav-item dropdown">
                <Link to="/catalogo" className="nav-link dropdown-toggle">
                  Catálogo</Link>
                <ul className="dropdown-menu">
                  {catalogoItems.map((item) => (
                    <li key={item.id}>
                      <Link className="dropdown-item" to={item.href}>
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>

              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle">
                  Sobre Nosotros
                </a>
               <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to="/nuestrahistoria">
                    Nuestra Historia
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/equipo">
                    Equipo
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/procesos">
                    Procesos
                  </Link>
                </li>
              </ul>
              </li>

              <li className="nav-item">
                <Link to="/comunidad" className="nav-link" >Comunidad</Link>
              </li>
            </ul>
        
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {!logueado && (
                <>
                  <li className="nav-item">
                    <Link to="/login" className="nav-link">Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/Registro" className="nav-link">Registrarse</Link>
                  </li>
                </>
              )}

              {logueado && (
                <>
                  <li className="nav-item">
                    <button 
                      className="nav-link btn btn-link border-0" 
                      onClick={openLogoutModal}
                      style={{ textDecoration: 'none', background: 'none' }}
                    >
                      Cerrar Sesion ({user})
                    </button>
                  </li>

                  <li className="nav-item">
                    <Link to="/edit_perfil" className="nav-link">Editar Perfil</Link>
                  </li>

                  <li className="nav-item">
                    <Link to="/edit_perfil" className="nav-link">
                    <i class="bi bi-bell-fill"></i>
                    <span class="badge text-bg-danger">4</span>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
          
          <div className="ms-3">
            <CartIcon />
          </div>
        </div>
      </nav>

      {showLogoutModal && (
        <div className="modal fade show d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)'}} tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Cerrar Sesión</h5>
                <button type="button" className="btn-close" onClick={closeLogoutModal}></button>
              </div>
              <div className="modal-body">
                <p>¿Estás seguro de que quieres cerrar sesión?</p>
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={closeLogoutModal}
                >
                  Cancelar
                </button>
                <button 
                  type="button" 
                  className="btn btn-primary" 
                  onClick={confirmLogout}
                >
                  Sí, Cerrar Sesión
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

