import React from "react";
import bakeryFondo from "../assets/img/fondo/bakerysimpleinside.jpg";
import "../styles/BakeryStyles.css";
import { Link } from "react-router-dom";


export default function BakeryBlog() {
  return (
    <div className="bakery-blog">

      <main className="bakery-main">
        <div
          className="bakery-background"
          style={{ backgroundImage: `url(${bakeryFondo})` }}
        >
          <div className="bakery-content">
            <h1 className="bakery-title">Gastronomia Blog</h1>
            <p className="bakery-description">
              Aquí puedes consultar las noticias y novedades de Gasronomia relacionadas con todo tipo de comidas.
            </p>

            <div className="bakery-iframe-section">
              <h3 className="bakery-iframe-title">Blog Cocina</h3>
              <div className="bakery-iframe-wrapper">
                <iframe
                  src="https://www.lazyblog.net/"
                  title="Noticias DUOC"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="bakery-iframe"
                ></iframe>
              </div>
              <div className="Cvolver">
                <div style={{ paddingTop: "60px" }}>
                  <Link to="/comunidad" className="comunidad-btn volver-btn"
                    onClick={() => window.scrollTo(0, 0)}>
                    ← Volver a Comunidad
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

    </div>
  );
}
