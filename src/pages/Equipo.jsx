import React from 'react';
import '../styles/style.css';
import fondo from '../assets/img/fondo/pasteleria.jpg'; 



export default function Equipo() {
  return (
    <div className="d-flex flex-column min-vh-100 bg-custom">

      <main className="flex-grow-1">


        <div
          className="container-fluid d-flex flex-column justify-content-center align-items-center text-center text-black py-5"
          style={{
           background: `url(${fondo}) center/cover no-repeat`, // 👈 usa la variable importada
              minHeight: "80vh",
          }}
        >
                    <div className="col-md-8 col-lg-6 bg-dark bg-opacity-50 p-5 rounded">

            <h1 className="mb-4 display-4 fw-bold text-white text-center">Quienes Somos</h1>
                </div>

          <div className="container bg-light bg-opacity-75 p-4 rounded-4 shadow">
            <h2 className="text-start text-black mb-4">Equipo de Trabajo</h2>
            <p className="text-start text-muted lh-lg">
              El corazón de la Pastelería Mil Sabores está formado por un equipo diverso de reposteros, pasteleros,
              diseñadores de tortas y personal de atención al cliente que comparten una misma pasión: crear experiencias
              inolvidables.
            </p>
            <p className="text-start text-muted lh-lg">
              Maestros pasteleros con décadas de experiencia mantienen vivas las recetas tradicionales, cuidando cada
              Reposteros jóvenes aportan innovación y creatividad, diseñando tortas modernas y postres adaptados a nuevas
              tendencias como productos veganos, sin gluten y sin azúcar.
              Nuestro equipo de servicio acompaña a los clientes en cada etapa de su compra, asegurando un trato cercano y
              amable que refleja la esencia de nuestra marca.
            </p>
          </div>
        </div>

      </main>
    </div>
  );
}
