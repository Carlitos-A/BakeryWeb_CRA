
import React, { useState } from 'react';
import { catalogoItems } from '../constantes/catalogoItems';
import CartIcon from './CartIcon';
import { Link } from "react-router-dom";
import { useCart } from "../components/CartContext";
import logopasteleria from '../assets/img/icons/logo.png';


export default function Header() {
  const logueado = localStorage.getItem("logueado") === "true";
  const user = localStorage.getItem("usuario");
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showClickDropdown, setShowClickDropdown] = useState(false);
  const { clearCart } = useCart();

  const openLogoutModal = () => {
    setShowLogoutModal(true);
  };

  const closeLogoutModal = () => {
    setShowLogoutModal(false);
  };

  const confirmLogout = () => {

  localStorage.removeItem("logueado");
  localStorage.removeItem("usuario");      
  localStorage.removeItem("usuarioActivo"); 
  

  const usuariosRegistrados = JSON.parse(localStorage.getItem("usuariosRegistrados")) || [];
  const usuarioActual = JSON.parse(localStorage.getItem("usuarioActivo")); 
  if (usuarioActual) {
    const usuariosActualizados = usuariosRegistrados.map(u =>
      u.usuario === usuarioActual.usuario ? usuarioActual : u
    );
    localStorage.setItem("usuariosRegistrados", JSON.stringify(usuariosActualizados));
  }


  clearCart();
  setShowLogoutModal(false);
  window.location.href = "/";
};

   const toggleClickDropdown = () => {
        setShowClickDropdown(!showClickDropdown);
   };



  return (
    <>
      <nav className="navbar navbar-expand-lg shadow-sm position-relative">
        <div className="container-fluid">

          <a className="navbar-brand" href="/">
            <img className="logo" src={logopasteleria} alt="Logo Pastelería" height="80" />
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
                <Link className="nav-link" to="/">
                  Inicio
                </Link>
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
                <Link className="nav-link dropdown-toggle">
                  Sobre Nosotros
                </Link>
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

              <li className="nav-item dropdown">
                <a
                  href="/comunidad"
                  className="nav-link dropdown-toggle"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  onClick={(e) => {
                    window.location.href = "/comunidad";
                  }}
                >
                  Comunidad
                </a>
                <ul className="dropdown-menu">
                  <li><Link className="dropdown-item" to="/bakeryBlog">Gastronomía Blog</Link></li>
                  <li><Link className="dropdown-item" to="/bakeryNews">Bakery News</Link></li>
                  <li><Link className="dropdown-item" to="/bakeryConsejos">Consejos Bakery</Link></li>
                  <li><Link className="dropdown-item" to="/RecetasChilenas">Recetas Chilenas</Link></li>
                </ul>
              </li>
            </ul>

            <form className="d-flex ms-auto" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Buscar..."
                aria-label="Buscar"
              />
              <button className="btn btn-buscar" type="submit">
                Buscar
              </button>
            </form>


        
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {!logueado && (
                <>
                  <li className="nav-item">
                    <Link to="/Login" className="nav-link">Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/Registro" className="nav-link">Registrarse</Link>
                  </li>
                </>
              )}

              {logueado && (
                <>

                  <li className="nav-item">
                    <div className="dropdown">
                      <button className="btn btn-transparent dropdown-toggle" type="button" onClick={toggleClickDropdown}>
                        <i className="bi bi-bell-fill"></i>
                        <span className="badge text-bg-danger">3</span>
                      </button>
                      {showClickDropdown && (<ul className="dropdown-menu show dropdown-menu-start">
                        <li><Link className="dropdown-item" to="">Notificacion 1</Link></li>
                        <li><Link className="dropdown-item" to="">Notificacion 2</Link></li>
                        <li><Link className="dropdown-item" to="">Notificacion 3</Link></li>
                      </ul>)}
                    </div>
                  </li>
                  <li className="nav-item">
                    <Link to="/Perfil" className="nav-link">Perfil</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/MisCompras" className="nav-link">Mis Compras</Link>
                  </li>
                  <li className="nav-item">
                    <button
                      className="nav-link btn btn-link border-0"
                      onClick={openLogoutModal}
                      style={{ textDecoration: 'none', background: 'none' }}
                    >
                      Cerrar Sesion ({user})
                    </button>
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

