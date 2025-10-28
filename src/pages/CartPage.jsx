import React, { useState } from "react";
import { useCart } from "../components/CartContext";
import { Link } from "react-router-dom";
import "../styles/Carrito.css";

export default function CarritoPage() {
  const { cart, removeFromCart, clearCart, updateQuantity } = useCart();
  const [showModal, setShowModal] = useState(false);

  const total = cart.reduce(
    (acc, item) => acc + (item.price || 0) * (item.cantidad || 1),
    0
  );

  const handlePago = () => {
    clearCart();
    setShowModal(true);
  };
  const cerrarModal = () => setShowModal(false);


  return (
    <main className="carrito-main">
      <div className="carrito-box">
        <h2 className="carrito-title">🛒 Tu Carrito</h2>

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
                  {cart.map((item, index) => (
                    <tr key={index}>
                      <td className="d-flex align-items-center">
                        {item.img && (
                          <img
                            src={item.img}
                            alt={item.title}
                            width="60"
                            height="60"
                          />
                        )}
                        <span>{item.title}</span>
                      </td>
                      <td>${item.price}</td>
                      <td>
                        <input
                          type="number"
                          min="1"
                          value={item.cantidad || 1}
                          className="form-control form-control-sm w-50"
                          onChange={(e) =>
                            updateQuantity(item.id, parseInt(e.target.value))
                          }
                        />
                      </td>
                      <td>${(item.price * (item.cantidad || 1)).toFixed(2)}</td>
                      <td>
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="carrito-footer">
              <h4>Total: ${total.toFixed(2)}</h4>
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
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "2rem",
              borderRadius: "8px",
              textAlign: "center",
            }}
          >
            <h2>Pago exitoso</h2>
            <button className="btn btn-primary" onClick={cerrarModal}>
              Cerrar
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
