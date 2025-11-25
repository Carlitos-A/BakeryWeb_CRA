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

  function isCumple(fechaNacimiento) {
    if (!fechaNacimiento) return false;

    const [year, month, day] = fechaNacimiento.split("-").map(Number);

    const hoy = new Date();
    const diaHoy = hoy.getDate(); // día actual
    const mesHoy = hoy.getMonth() + 1; // meses empiezan en 0

    return day === diaHoy && month === mesHoy;
  }



  // Obtener descuentos del usuario
  useEffect(() => {
    if (!idUsuario) return;
    obtenerDescuentosPorUsuario(idUsuario)
      .then((data) => {
        console.log("DESCUENTOS OBTENIDOS:", data); // <--- AGREGA ESTO
        setDescuentos(data);
      })
      .catch((err) => console.error("Error obteniendo descuentos:", err));
  }, [idUsuario]);


  useEffect(() => {
    const subtotal = cart.reduce(
      (acc, item) => acc + item.price * (item.cantidad || 1),
      0
    );

    const descuentosGenerales = descuentos
      .filter(d => d.codigo !== "DUOC_CUMPLE")
      .map(d => ({
        codigo: d.codigo,
        porcentaje: d.porcentaje,
        monto: subtotal * (d.porcentaje / 100)
      }));

    const totalDescuentosGenerales = descuentosGenerales.reduce(
      (acc, d) => acc + d.monto,
      0
    );

    let descuentoTorta = null;
    const descuentoCumple = descuentos.find(d => d.codigo === "DUOC_CUMPLE");

    const esCumple = usuarioActivo?.fechaNacimiento
      ? isCumple(usuarioActivo.fechaNacimiento)
      : false;

    const tortas = cart.filter(item =>
      item.category?.toLowerCase().includes("torta")
    );

    if (
      descuentoCumple &&
      esCumple &&
      tortas.length === 1 &&
      (tortas[0].cantidad || 1) === 1
    ) {
      descuentoTorta = {
        codigo: "DUOC_CUMPLE",
        porcentaje: 100,
        monto: tortas[0].price
      };
    }

    const totalConDescuento =
      subtotal -
      totalDescuentosGenerales -
      (descuentoTorta ? descuentoTorta.monto : 0);

    const detalleFinal = [
      ...descuentosGenerales,
      ...(descuentoTorta ? [descuentoTorta] : [])
    ];

    setTotal(totalConDescuento);
    setDescuentoDetalle(detalleFinal);
    console.log("TORTAS ENCONTRADAS:", tortas);
  }, [cart, descuentos]);


  const handlePago = () => {
    clearCart();
    setShowModal(true);
  };
  const cerrarModal = () => setShowModal(false);

  console.log("FECHA NACIMIENTO LOCALSTORAGE:", usuarioActivo.fechaNacimiento);
  console.log("ES CUMPLE?:", isCumple(usuarioActivo.fechaNacimiento));




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
