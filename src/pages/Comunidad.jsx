import React from "react";
import "../styles/Comunidad.css";
import bakeryFondo from "../assets/img/fondo/bakerysimpleinside.jpg";
import { Link } from "react-router-dom";

export default function Comunidad() {
  return (
    <div className="comunidad-page">
      <main className="comunidad-main">
        <div
          className="comunidad-background"
          style={{ backgroundImage: `url(${bakeryFondo})` }}
        >
          <div className="comunidad-content">
            <h1 className="comunidad-title">Bienvenido a la Baker Community</h1>

            <p className="comunidad-description">
              Encuentra todo lo necesario para aprender, compartir y mantenerte informado sobre el mundo de la pastelería y también gastronomía en general.
            </p>

            <div className="comunidad-links">
              <Link to="/bakeryBlog" className="comunidad-btn">
                Gastronomía Blog
              </Link>

              <Link to="/bakeryNews" className="comunidad-btn">
                Bakery News
              </Link>

              <Link to="/bakeryConsejos" className="comunidad-btn">
                Consejos Bakery
              </Link>

              <Link to="/RecetasCHilenas" className="comunidad-btn">
                Recetas Chilenas
              </Link>
            </div>

            <div className="comunidad-iframe-section">
              <h3 className="comunidad-iframe-title">Blogs y Noticias</h3>
              <div className="comunidad-iframe-wrapper">
                <iframe
                  src="https://www.biobiochile.cl/especial/food-service-2025/noticias/2025/10/10/destacan-impacto-de-feria-espacio-food-service-en-chile-anuncian-su-version-2026.shtml"
                  title="BioBio Noticias"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="comunidad-iframe"
                ></iframe>
              </div>
            </div>

            <div className="comunidad-comentarios">
              <h3 className="comunidad-comentarios-title">
                Déjanos tu consulta o comentario
              </h3>
              <form>
                <textarea
                  className="comunidad-textarea"
                  rows="4"
                  placeholder="Escribe tu mensaje aquí..."
                ></textarea>
                <button type="submit" className="comunidad-btn comunidad-btn-enviar">
                  Enviar
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
