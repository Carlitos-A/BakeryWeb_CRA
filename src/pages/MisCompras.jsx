import React from "react";
import { productos } from "../constantes/productos";
import "../styles/MisCompras.css";

function ComprasRealizadas() {
  const compras = [
    {
      id: 1,
      fecha: "2025-10-15",
      productos: [
        { ...productos[0], cantidad: 1 },
        { ...productos[2], cantidad: 2 },
      ],
      estado: "Entregado",
    },
    {
      id: 2,
      fecha: "2025-10-18",
      productos: [
        { ...productos[4], cantidad: 1 },
        { ...productos[5], cantidad: 1 },
      ],
      estado: "En proceso",
    },
    {
      id: 3,
      fecha: "2025-10-20",
      productos: [
        { ...productos[7], cantidad: 3 },
        { ...productos[10], cantidad: 2 },
      ],
      estado: "Entregado",
    },
  ];

  return (
    <main className="compras-main">
      <h2 className="compras-titulo">Compras Realizadas</h2>
      <div className="compras-grid">
        {compras.map((compra) => {
          const total = compra.productos.reduce(
            (sum, p) => sum + p.price * p.cantidad,
            0
          );
          return (
            <div key={compra.id} className="compras-card">
              <div className="compras-header">
                Compra #{compra.id} - {compra.fecha}
              </div>
              <div className="compras-body">
                <ul className="compras-lista">
                  {compra.productos.map((p, index) => (
                    <li key={index} className="compras-item">
                      <div>
                        <img src={p.img} alt={p.alt} />
                        {p.title} x {p.cantidad}
                      </div>
                      <span>${p.price * p.cantidad}</span>
                    </li>
                  ))}
                </ul>

                <div className="compras-total">
                  <span>Total:</span>
                  <span>${total}</span>
                </div>

                <div
                  className={
                    compra.estado === "Entregado"
                      ? "estado-entregado"
                      : "estado-proceso"
                  }
                >
                  {compra.estado}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}

export default ComprasRealizadas;
