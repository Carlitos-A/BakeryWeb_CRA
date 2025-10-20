import React from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import '../styles/style.css';

export default function Equipo() {
  return (
    <div className="d-flex flex-column min-vh-100 bg-custom">

      <main className="flex-grow-1">

        {/* Hero con imagen de fondo */}
        <div
          className="w-100 d-flex justify-content-center align-items-center"
          style={{
            background: "url('/productos/pasteleria.jpg') center/cover no-repeat",
            height: "100vh"
          }}
        >
          <div className=" text-black">
            <h1>Quiénes Somos</h1>
          </div>
        </div>

        {/* Sección de contenido */}
        <div className="container my-5">
          <h2 className="text-center text-black">Equipo de Trabajo</h2>
          <p className="text-muted lh-lg">
            El corazón de la Pastelería Mil Sabores está formado por un equipo diverso de reposteros, pasteleros, diseñadores de tortas y personal de atención al cliente que comparten una misma pasión: crear experiencias inolvidables.
          </p>
          <p className="text-muted lh-lg">
            Maestros pasteleros con décadas de experiencia mantienen vivas las recetas tradicionales, cuidando cada detalle en textura, aroma y sabor.
          </p>
          <p className="text-muted lh-lg">
            Reposteros jóvenes aportan innovación y creatividad, diseñando tortas modernas y postres adaptados a nuevas tendencias como productos veganos, sin gluten y sin azúcar.
          </p>
          <p className="text-muted lh-lg">
            Nuestro equipo de servicio acompaña a los clientes en cada etapa de su compra, asegurando un trato cercano y amable que refleja la esencia de nuestra marca.
          </p>
        </div>

      </main>

    </div>
  );
}
