import React, { useEffect, useState } from "react";
import { useCart } from "../components/CartContext";
import { Link } from "react-router-dom";
import "../styles/Carrito.css";
import { obtenerDescuentosPorUsuario } from "../api/descuentoService.js";

export default function CarritoPage() {
  const { cart, removeFromCart, clearCart, updateQuantity } = useCart();
  const [showModal, setShowModal] = useState(false);
  const [descuentos, setDescuentos] = useState([]);
  const [descuentoDetalle, setDescuentoDetalle] = useState([]);
  const [total, setTotal] = useState(0);

  const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));
  const idUsuario = usuarioActivo ? usuarioActivo.idUsuario : null;

  // Obtener descuentos del usuario
  useEffect(() => {
    if (!idUsuario) return;
    obtenerDescuentosPorUsuario(idUsuario)
      .then((data) => setDescuentos(data))
      .catch((err) => console.error("Error obteniendo descuentos:", err));
  }, [idUsuario]);

  // Calcular total general y desglose de descuentos
  useEffect(() => {
    const subtotal = cart.reduce((acc, item) => acc + item.price * (item.cantidad || 1), 0);

    const detalle = descuentos.map(d => ({
      codigo: d.codigo,
      porcentaje: d.porcentaje,
      monto: subtotal * (d.porcentaje / 100)
    }));

    const totalConDescuento = subtotal - detalle.reduce((acc, d) => acc + d.monto, 0);

    setTotal(totalConDescuento);
    setDescuentoDetalle(detalle);
  }, [cart, descuentos]);

  const handlePago = () => {
    clearCart();
    setShowModal(true);
  };
  const cerrarModal = () => setShowModal(false);

  return (
    <main className="carrito-main">
      <div className="carrito-box">
        <h2 className="carrito-title">Tu Carrito</h2>

        {cart.length === 0 ? (
          <div className="carrito-vacio">
            <i className="bi bi-cart"></i>
            <p className="fs-5">Parece que tu carrito está vacío.</p>
            <p className="text-secondary mb-4">
              Agrega tus productos favoritos y los verás aquí.
            </p>
            <Link to="/" className="btn btn-primary btn-lg">
              Volver a la tienda
            </Link>
          </div>
        ) : (
          <>
            <div className="table-responsive carrito-tabla">
              <table className="table align-middle mb-0">
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                    <th>Subtotal</th>
                    <th>Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item, index) => {
                    const subtotal = item.price * (item.cantidad || 1);
                    return (
                      <tr key={index}>
                        <td>{item.title}</td>
                        <td>${item.price}</td>
                        <td>
                          <input
                            type="number"
                            min="1"
                            value={item.cantidad || 1}
                            onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                          />
                        </td>
                        <td>${subtotal.toFixed(2)}</td>
                        <td>
                          <button onClick={() => removeFromCart(item.id)}>Eliminar</button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="carrito-footer">
              <h4>Total: ${total.toFixed(2)}</h4>

              {descuentoDetalle.length > 0 && (
                <div style={{ fontSize: "0.9rem", color: "#555", marginTop: "0.5rem" }}>
                  <strong>DESCUENTOS APLICADOS</strong>
                  <ul style={{ margin: 0, paddingLeft: "1rem" }}>
                    {descuentoDetalle.map((d, i) => (
                      <li key={i}>
                        {d.codigo}: -${d.monto.toFixed(2)} ({d.porcentaje}%)
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div>
                <button className="btn btn-danger me-2" onClick={clearCart}>
                  Vaciar carrito
                </button>
                <button className="btn btn-success" onClick={handlePago}>
                  Proceder al pago
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {showModal && (
        <div style={{
          position: "fixed",
          top: 0, left: 0,
          width: "100%", height: "100%",
          backgroundColor: "rgba(0,0,0,0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: "white",
            padding: "2rem",
            borderRadius: "8px",
            textAlign: "center"
          }}>
            <h2>Pago exitoso</h2>
            <button className="btn btn-primary" onClick={cerrarModal}>Cerrar</button>
          </div>
        </div>
      )}
    </main>
  );
}
