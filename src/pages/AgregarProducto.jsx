import { useState } from "react";
import "../styles/style.css";

export default function AgregarProducto() {
  const [producto, setProducto] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    stock: "",
    imagenUrl: ""
  });

  const [mensaje, setMensaje] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto({ ...producto, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");

    if (!producto.nombre || !producto.precio || !producto.stock) {
      setMensaje("Completa al menos nombre, precio y stock.");
      return;
    }

    try {
      const respuesta = await fetch("http://localhost:8080/api/productos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...producto,
          precio: parseFloat(producto.precio),
          stock: parseInt(producto.stock)
        })
      });

      if (respuesta.ok) {
        setMensaje("Producto agregado correctamente");
        setProducto({ nombre: "", descripcion: "", precio: "", stock: "", imagenUrl: "" });
      } else {
        const error = await respuesta.text();
        setMensaje(`Error al agregar producto: ${error}`);
      }
    } catch (err) {
      setMensaje(`Error de conexión: ${err.message}`);
    }
  };

  return (
    <div className="agregar-container">
      <h2 className="agregar-titulo">Agregar Producto</h2>
      <form onSubmit={handleSubmit} className="agregar-form">
        <label>
          Nombre:
          <input
            name="nombre"
            placeholder="Ej: Torta de chocolate"
            value={producto.nombre}
            onChange={handleChange}
          />
        </label>

        <label>
          Descripción:
          <textarea
            name="descripcion"
            placeholder="Describe brevemente el producto"
            value={producto.descripcion}
            onChange={handleChange}
          />
        </label>

        <div className="agregar-doble">
          <label>
            Precio:
            <input
              name="precio"
              type="number"
              placeholder="Ej: 15000"
              value={producto.precio}
              onChange={handleChange}
            />
          </label>
          <label>
            Stock:
            <input
              name="stock"
              type="number"
              placeholder="Ej: 20"
              value={producto.stock}
              onChange={handleChange}
            />
          </label>
        </div>

        <label>
          URL de la imagen:
          <input
            name="imagenUrl"
            placeholder="/assets/img/productos/torta.jpg"
            value={producto.imagenUrl}
            onChange={handleChange}
          />
        </label>

        <button type="submit" className="btn-agregar">
          Agregar Producto
        </button>
      </form>

      {mensaje && <p className="mensaje">{mensaje}</p>}
    </div>
  );
}
