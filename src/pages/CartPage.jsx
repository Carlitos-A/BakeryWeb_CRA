import React from "react";
import { useCart } from "../components/CartContext";
import { Link } from "react-router-dom";

export default function CartPage() {
  const { cart, removeFromCart, clearCart, updateQuantity } = useCart();

  const total = cart.reduce((acc, item) => acc + (item.price || 0) * (item.cantidad || 1), 0);

  return (
    <div className="container py-5">
      <h2 className="mb-5 text-center display-5 fw-bold"> Tu Carrito</h2>

      {cart.length === 0 ? (
        <div className="d-flex flex-column justify-content-center align-items-center py-5">
          <i className="bi bi-cart fs-1 mb-4 text-muted"></i>
          <p className="fs-5 text-center text-muted mb-3">
            Parece que tu carrito está vacío.
          </p>
          <p className="text-center text-secondary mb-4">
            Agrega tus productos favoritos y los verás aquí.
          </p>
          <Link to="/" className="btn btn-primary btn-lg">
            Volver a la tienda
          </Link>
        </div>
      ) : (
        <>
          <div className="table-responsive shadow-sm rounded">
            <table className="table align-middle mb-0 bg-white">
              <thead className="table-light">
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
                          className="me-3 rounded"
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

          <div className="d-flex justify-content-between align-items-center mt-4">
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
  );
}
