import React, { useState, useEffect } from 'react';
import '../styles/Catalogo.css';
import { catalogoItems } from '../constantes/catalogoItems.js';
import { useCart } from '../components/CartContext.jsx';
import { useParams, useNavigate } from "react-router-dom";
import { listarProductos } from '../api/productosService.js';

export default function Catalogo() {
    const { addToCart } = useCart();
    const navigate = useNavigate();
    const { categoria } = useParams();
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todos los productos");

    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const data = await listarProductos();

                const productosList = data._embedded
                    ? Object.values(data._embedded)[0]
                    : Array.isArray(data)
                        ? data
                        : [];

                const adaptados = productosList.map(p => ({
                    id: p.id_producto,
                    title: p.nombre,
                    category: p.categoria,
                    description: p.descripcion,
                    price: p.precio,
                    sku: p.sku,
                    stock: p.stock,
                    img: p.enlaceimg,
                }));

                setProductos(adaptados);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProductos();
    }, []);

    useEffect(() => {
        if (categoria) {
            const catNombre = categoria.replace(/-/g, " ");
            setCategoriaSeleccionada(catNombre);
        } else {
            setCategoriaSeleccionada("Todos los productos");
        }
    }, [categoria]);

    const productosFiltrados =
        categoriaSeleccionada === "Todos los productos"
            ? productos
            : productos.filter(
                (p) => (p.category || '').toLowerCase() === categoriaSeleccionada.toLowerCase()
            );

    if (loading) return <p className="text-center mt-5">Cargando productos...</p>;
    if (error) return <p className="text-center text-danger mt-5">{error}</p>;

    return (
        <div className="catalogo-container">

            <div className="container">

                <div className="fila">

                    {/* Filtro Categorías */}
                    <aside className="col-3 filtro-categorias">
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

                        <button
                            className="btn-agregar mt-3"
                            onClick={() => navigate("/AgregarProducto")}
                        >
                            Agregar producto
                        </button>
                    </aside>

                    {/* Productos */}
                    <div className="col-9">
                        <h4 className="titulo-categoria">
                            {categoriaSeleccionada === "Todos los productos"
                                ? "Todos los productos"
                                : `Categoría: ${categoriaSeleccionada}`}
                        </h4>

                        <div className="grid-productos">
                            {productosFiltrados.length > 0 ? (
                                productosFiltrados.map((product) => (
                                    <div key={product.id} className="card-producto">

                                        <img
                                            src={product.img}
                                            alt={product.title}
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

                                                <span className="precio-final">
                                                    {product.price} CLP
                                                </span>
                                            </div>

                                            <button
                                                className="btn-agregar"
                                                onClick={() => addToCart(product)}
                                            >
                                                Agregar al carrito
                                            </button>

                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="sin-productos">
                                    No hay productos en esta categoría.
                                </p>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
