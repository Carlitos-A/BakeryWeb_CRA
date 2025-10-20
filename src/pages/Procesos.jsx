import React, { useState, useEffect } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import '../styles/style.css';


export default function Procesos() {
  return (
    <div className="d-flex flex-column min-vh-100 bg-custom">
      <main className="flex-grow-1">
        <div
          className="w-100 d-flex flex-column justify-content-center align-items-center text-center"
          style={{
            background: "url('/assets/img/fondo/p_pastel.jpg') center/cover no-repeat",
            height: "100vh",
          }}
        >
          <div className="col-md-8 col-lg-6 bg-dark bg-opacity-50 p-5 rounded">
            <h1 className="mb-4 display-4 fw-bold text-white text-center">Procesos</h1>
          </div>

        </div>
        <div className="container my-5">
          <h2 className="text-center text-black">Nuestros Procesos</h2>
          <p className="text-muted lh-lg">
            Cada producto que elaboramos pasa por un proceso cuidado y transparente:
          </p>
          <ul className="text-black">
            <li>
              <strong>Selección de ingredientes:</strong> trabajamos con proveedores locales
              para garantizar frescura y calidad en frutas, harinas y chocolates.
            </li>
            <li>
              <strong>Elaboración artesanal:</strong> combinamos técnicas tradicionales con
              innovación gastronómica, manteniendo el sabor auténtico de la repostería chilena.
            </li>
            <li>
              <strong>Personalización de pedidos:</strong> ofrecemos tortas y postres adaptados
              a cada ocasión, permitiendo a los clientes elegir diseños, mensajes y estilos únicos.
            </li>
            <li>
              <strong>Control de calidad:</strong> cada producto es revisado antes de llegar al
              cliente, asegurando que cumpla con nuestros estándares de excelencia.
            </li>
            <li>
              <strong>Entrega y experiencia:</strong> acompañamos el proceso de compra con un
              servicio de despacho confiable, pensado para que los momentos dulces lleguen siempre a tiempo.
            </li>
          </ul>

          <p className="mt-4 text-muted">
            De esta forma, <strong>Pastelería Mil Sabores</strong> no solo vende postres, sino
            que crea experiencias que celebran la vida, la tradición y la creatividad.
          </p>
        </div>
      </main>
    </div>
  );
}