import React from "react";
import "../styles/BakeryStyles.css";
import bakeryFondo from "../assets/img/fondo/bakerysimpleinside.jpg";
import { Link } from "react-router-dom";


export default function BakeryRecetas() {
  return (
    <div className="recetas-page">

      <main className="recetas-main">
        <section
          className="recetas-background"
          style={{ backgroundImage: `url(${bakeryFondo})` }}
        >
          <div className="recetas-overlay">
            <div className="recetas-content">
              <h1 className="recetas-title">Recetas Chilenas</h1>
              <p className="recetas-description">
                Aquí puedes ver muchas recetas de repostería orientadas a nuestra cultura gastronómica.
              </p>

              <div className="recetas-iframe-section">
                <h3 className="recetas-iframe-title">Recetas Chilenas Gourmet</h3>
                <div className="recetas-iframe-wrapper">
                  <iframe
                    src="https://www.gourmet.cl/tipo-plato/dulces-y-postres-chilenos/"
                    title="Recetas Gourmet"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="recetas-iframe"
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
        </section>
      </main>
    </div>
  );
}
