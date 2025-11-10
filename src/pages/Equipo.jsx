import React from "react";
import "../styles/Equipo.css";
import fondo from "../assets/img/fondo/pasteleria.jpg";

export default function Equipo() {
  return (
    <div className="equipo-page">
      <main className="equipo-main">
        <div
          className="equipo-background"
          style={{ backgroundImage: `url(${fondo})` }}
        >
          <div className="equipo-header">
            <h1 className="equipo-title">Quiénes Somos</h1>
          </div>

          <div className="equipo-content">
            <h2 className="equipo-subtitle">Equipo de Trabajo</h2>
            <p className="equipo-text">
              El corazón de la Pastelería Mil Sabores está formado por un equipo diverso de reposteros, pasteleros,
              diseñadores de tortas y personal de atención al cliente que comparten una misma pasión: crear experiencias
              inolvidables.
            </p>
            <p className="equipo-text">
              Maestros pasteleros con décadas de experiencia mantienen vivas las recetas tradicionales, cuidando cada
              detalle. Reposteros jóvenes aportan innovación y creatividad, diseñando tortas modernas y postres adaptados
              a nuevas tendencias como productos veganos, sin gluten y sin azúcar. Nuestro equipo de servicio acompaña a
              los clientes en cada etapa de su compra, asegurando un trato cercano y amable que refleja la esencia de
              nuestra marca.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
