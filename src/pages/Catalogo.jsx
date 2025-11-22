import React, { useState, useEffect } from 'react';
import '../styles/Catalogo.css';
import axios from "axios";
import { catalogoItems } from '../constantes/catalogoItems.js';
import { useCart } from '../components/CartContext.jsx';
import { useParams, useNavigate } from "react-router-dom";

export default function Catalogo() {
    const { addToCart } = useCart();
    const navigate = useNavigate();
    const { categoria } = useParams();

    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todos los productos");
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 🔹 API KEY DEL BACKEND
   const API_KEY = "123456789ABCDEF";

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const response = await axios.get(
    "http://localhost:8083/api/v1/Productos",
    {
        headers: {
            "X-API-KEY": "123456789ABCDEF" 
        }
    }
);
                const data = response.data;

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
                setError("Error al obtener productos: " + err.message);
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
        <div className="d-flex flex-column min-vh-100 bg-custom">
            <div className="container my-5">
                <div className="row">

                    {/* Barra lateral */}
                    <aside className="col-md-3 mb-4">
                        <div className="p-3 bg-white rounded shadow-sm">
                            <h5 className="mb-3 text-center">Filtrar por categoría</h5>
                            <ul className="list-group mb-3">
                                {catalogoItems.map((item) => (
                                    <li
                                        key={item.id}
                                        className={`list-group-item list-group-item-action ${
                                            categoriaSeleccionada.toLowerCase().trim() ===
                                            item.name.toLowerCase().trim()
                                                ? "active"
                                                : ""
                                        }`}
                                        style={{ cursor: "pointer" }}
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

                            <div className="text-center mt-3">
                                <button
                                    className="btn btn-color-car w-100"
                                    onClick={() => navigate("/AgregarProducto")}
                                >
                                    Agregar producto
                                </button>
                            </div>
                        </div>
                    </aside>

                    {/* Productos */}
                    <div className="col-md-9">
                        <h4 className="mb-4 text-dark">
                            {categoriaSeleccionada === "Todos los productos"
                                ? "Todos los productos"
                                : `Categoría: ${categoriaSeleccionada}`}
                        </h4>

                        <div className="row g-4">
                            {productosFiltrados.length > 0 ? (
                                productosFiltrados.map((product) => (
                                    <div key={product.id} className="col-sm-6 col-md-4 col-lg-3">
                                        <div className="card h-100 shadow-sm border-0 hover-shadow">
                                            <img
                                                src={product.img}
                                                className="card-img-top rounded-top"
                                                alt={product.title || 'producto'}
                                                style={{ objectFit: "cover", height: "180px" }}
                                            />
                                            <div className="card-body d-flex flex-column justify-content-between">
                                                <div>
                                                    <p className="small text-muted mb-1">{product.category}</p>
                                                    <h6 className="fw-bold">{product.title}</h6>
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <span className="fw-semibold text-dark">{product.price} CLP</span>
                                                    </div>
                                                </div>
                                                <div className="text-center mt-3">
                                                    <button
                                                        className="btn btn-color-car w-100 btn-sm"
                                                        onClick={() => addToCart(product)}
                                                    >
                                                        Agregar al carrito
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-muted">No hay productos en esta categoría.</p>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
