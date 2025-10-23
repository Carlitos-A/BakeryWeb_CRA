import React from "react";
import { productos } from "../constantes/productos"; // Ajusta la ruta según tu proyecto
import '../styles/style.css';

function ComprasRealizadas() {

  // Lista de compras prediseñadas usando los productos importados
  const compras = [
    {
      id: 1,
      fecha: "2025-10-15",
      productos: [
        { ...productos[0], cantidad: 1 }, // Torta Cuadrada de Chocolate
        { ...productos[2], cantidad: 2 }  // Tiramisú Clásico
      ],
      estado: "Entregado"
    },
    {
      id: 2,
      fecha: "2025-10-18",
      productos: [
        { ...productos[4], cantidad: 1 }, // Torta Especial de Cumpleaños 1
        { ...productos[5], cantidad: 1 }  // Torta Cuadrada de Frutas
      ],
      estado: "En proceso"
    },
    {
      id: 3,
      fecha: "2025-10-20",
      productos: [
        { ...productos[7], cantidad: 3 }, // Mousse de Chocolate
        { ...productos[10], cantidad: 2 } // Empanada de Manzana
      ],
      estado: "Entregado"
    },
  ];

  return (
    <main className="container my-5">
      <h2 className="text-center mb-4">Compras Realizadas</h2>
      <div className="row">
        {compras.map(compra => {
          const total = compra.productos.reduce((sum, p) => sum + p.price * p.cantidad, 0);
          return (
            <div key={compra.id} className="col-md-6 mb-4">
              <div className="card shadow-sm p-3">
                <div className="card-header bg-primary text-white">
                  <strong>Compra #{compra.id}</strong> - {compra.fecha}
                </div>
                <div className="card-body">
                  <ul className="list-group mb-3">
                    {compra.productos.map((p, index) => (
                      <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                        <div>
                          <img src={p.img} alt={p.alt} style={{ width: 50, height: 50, objectFit: 'cover', marginRight: 10 }} />
                          {p.title} x {p.cantidad}
                        </div>
                        <span>${p.price * p.cantidad}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="d-flex justify-content-between">
                    <strong>Total:</strong>
                    <strong>${total}</strong>
                  </div>
                  <div className={`mt-2 badge ${compra.estado === "Entregado" ? 'bg-success' : 'bg-warning text-dark'}`}>
                    {compra.estado}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </main>
  );
}

export default ComprasRealizadas;
