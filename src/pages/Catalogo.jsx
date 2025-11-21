import React, { useState, useEffect } from 'react';
import '../styles/Catalogo.css';
import { productos } from '../constantes/productos.js';
import { catalogoItems } from '../constantes/catalogoItems.js';
import { useCart } from '../components/CartContext.jsx';
import { useParams, useNavigate, useLocation } from "react-router-dom";

export default function Catalogo() {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const { categoria } = useParams();
  const location = useLocation();

  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todos los productos");
  const [terminoBusqueda, setTerminoBusqueda] = useState("");

  useEffect(() => {
    // Detectar categoría en URL
    if (categoria) {
      const catNombre = categoria.replace(/-/g, " ");
      setCategoriaSeleccionada(catNombre);
    } else {
      setCategoriaSeleccionada("Todos los productos");
    }
  }, [categoria]);

  useEffect(() => {
    // Leer parámetro de búsqueda de la URL
    const params = new URLSearchParams(location.search);
    const termino = params.get("busqueda") || "";
    setTerminoBusqueda(termino);
  }, [location]);

  // Filtrado por categoría y término de búsqueda
  const productosFiltrados = productos.filter((p) => {
    const coincideCategoria =
      categoriaSeleccionada === "Todos los productos" ||
      p.category.toLowerCase() === categoriaSeleccionada.toLowerCase();

    const coincideBusqueda =
      terminoBusqueda === "" ||
      p.title.toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
      p.category.toLowerCase().includes(terminoBusqueda.toLowerCase());

    return coincideCategoria && coincideBusqueda;
  });

  return (
    <div className="catalogo-container">
      <div className="container">
        <div className="row">
          {/* FILTRO DE CATEGORÍAS */}
          <aside className="col-md-3 mb-4">
            <div className="filtro-categorias">
              <h5 className="titulo-filtro">Filtrar por categoría</h5>
              <ul className="lista-categorias">
                {catalogoItems.map((item) => (
                  <li
                    key={item.id}
                    className={`categoria-item ${
                      categoriaSeleccionada.toLowerCase().trim() === item.name.toLowerCase().trim()
                        ? "categoria-activa"
                        : ""
                    }`}
                    onClick={() => {
                      const ruta =
                        item.name === "Todos los productos"
                          ? "/catalogo"
                          : `/catalogo/${item.name.toLowerCase().replace(/\s+/g, "-")}`;
                      navigate(ruta);
                    }}
                  >
                    {item.name}
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* LISTA DE PRODUCTOS */}
          <div className="col-md-9">
            <h4 className="titulo-categoria">
              {categoriaSeleccionada === "Todos los productos"
                ? "Todos los productos"
                : `Categoría: ${categoriaSeleccionada}`}
            </h4>

            {terminoBusqueda && (
              <p className="busqueda-info">
                Resultados para: <strong>{terminoBusqueda}</strong>
              </p>
            )}

            <div className="row g-4">
              {productosFiltrados.length > 0 ? (
                productosFiltrados.map((product) => (
                  <div 
                  key={product.id} 
                  className="col-sm-6 col-md-4 col-lg-3"
                  data-testid="producto">
                    <div className="card-producto">
                      <img
                        src={product.img}
                        alt={product.alt}
                        className="imagen-producto"
                      />
                      <div className="card-cuerpo">
                        <p className="categoria-producto">{product.category}</p>
                        <h6 className="titulo-producto">{product.title}</h6>
                        <div className="precio-container">
                          {product.originalPrice && (
                            <span className="precio-original">
                              {product.originalPrice} CLP
                            </span>
                          )}
                          <span className="precio-final">{product.price} CLP</span>
                        </div>
                        <button
                          className="btn-agregar"
                          onClick={() => addToCart(product)}
                        >
                          Agregar al carrito
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="sin-productos">No hay productos que coincidan con tu búsqueda.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
