import React from 'react';
import '../styles/Procesos.css';

import pastelFondo from '../assets/img/fondo/p_pastel.jpg';

export default function Procesos() {
  return (
    <div className="procesos-page">
      <main className="procesos-main">
        <section
          className="procesos-hero"
          style={{ backgroundImage: `url(${pastelFondo})` }}
        >
          <div className="procesos-overlay">
            <h1 className="procesos-title">Procesos</h1>
          </div>
        </section>

        <section className="procesos-content container">
          <h2 className="procesos-subtitle">Nuestros Procesos</h2>
          <p className="procesos-text">
            Cada producto que elaboramos pasa por un proceso cuidado y transparente:
          </p>

          <ul className="procesos-list">
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

          <p className="procesos-text mt-4">
            De esta forma, <strong>Pastelería Mil Sabores</strong> no solo vende postres, sino
            que crea experiencias que celebran la vida, la tradición y la creatividad.
          </p>
        </section>
      </main>

    </div>
  );
}
