import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { buscarProducto, actualizarProducto } from "../api/productosService";
import "../styles/Perfil.css";

export default function EditarProducto() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarProducto = async () => {
      try {
        const data = await buscarProducto(id);
        setProducto(data);
      } catch (error) {
        console.error("Error cargando producto:", error);
      } finally {
        setLoading(false);
      }
    };
    cargarProducto();
  }, [id]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setProducto((prev) => ({ ...prev, [id]: value }));
  };

  const handleGuardar = async (e) => {
    e.preventDefault();
    try {
      const actualizar = {
        nombre: producto.nombre,           // predeterminado
        precio: producto.precio,           // editable
        sku: producto.sku,                 // predeterminado
        descripcion: producto.descripcion, // predeterminado
        estado: producto.estado,            // predeterminado
        stock: producto.stock               // <--- agregar stock
      };
      await actualizarProducto(id, actualizar);
      alert("Producto actualizado correctamente");
      navigate("/admin/productos");
    } catch (error) {
      console.error(error);
      alert("Error al actualizar producto");
    }
  };

  if (loading) return <p className="text-center mt-5">Cargando producto...</p>;
  if (!producto) return <p className="text-center mt-5">No se pudo cargar el producto</p>;

  return (
    <main className="perfil-main">
      <div className="perfil-box">
        <h2 className="text-center mb-4">Editar Producto</h2>
        <form onSubmit={handleGuardar}>
          {/* Nombre - solo lectura */}
          <div className="perfil-input-group mb-3">
            <span className="perfil-label">Nombre:</span>
            <input id="nombre" value={producto.nombre} className="perfil-input" disabled />
          </div>

          {/* SKU - solo lectura */}
          <div className="perfil-input-group mb-3">
            <span className="perfil-label">SKU:</span>
            <input id="sku" value={producto.sku} className="perfil-input" disabled />
          </div>

          {/* Descripción - solo lectura */}
          <div className="perfil-input-group mb-3">
            <span className="perfil-label">Descripción:</span>
            <input id="descripcion" value={producto.descripcion} className="perfil-input" disabled />
          </div>

          {/* Precio - editable */}
          <div className="perfil-input-group mb-3">
            <span className="perfil-label">Precio:</span>
            <input id="precio" value={producto.precio} onChange={handleChange} className="perfil-input" />
          </div>

          {/* Stock - editable */}
          <div className="perfil-input-group mb-3">
            <span className="perfil-label">Stock:</span>
            <input id="stock" value={producto.stock || ""} onChange={handleChange} className="perfil-input" />
          </div>

          <div className="text-center">
            <button className="perfil-btn btn-lg" type="submit">Guardar Cambios</button>
          </div>
        </form>
      </div>
    </main>
  );
}
