import React from "react";
import { useCart } from "../components/CartContext";
import { Link } from "react-router-dom";
import "../styles/Carrito.css";

export default function CarritoPage() {
  const { cart, removeFromCart, clearCart, updateQuantity } = useCart();

  const total = cart.reduce((acc, item) => acc + (item.price || 0) * (item.cantidad || 1), 0);

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
                <button className="btn btn-success">Proceder al pago</button>
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
