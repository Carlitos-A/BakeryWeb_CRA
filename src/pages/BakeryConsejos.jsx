import React from "react";
import "../styles/BakeryStyles.css";
import bakeryFondo from "../assets/img/fondo/bakerysimpleinside.jpg";
import { Link } from "react-router-dom";


export default function BakeryConsejos() {
  return (
    <div className="bakery-tips-page">

      <main className="bakery-tips-main">
        <div
          className="bakery-tips-background"
          style={{ backgroundImage: `url(${bakeryFondo})` }}
        >
          <div className="bakery-tips-content">
            <h1 className="bakery-tips-title">Bakery Consejos</h1>
            <p className="bakery-tips-description">
              Aquí tienes consejos para pastelería para tus próximas creaciones
            </p>

            <div className="bakery-tips-video-section">
              <h3 className="bakery-tips-video-title">Video Bakery</h3>
              <div className="bakery-tips-video-wrapper">
                <iframe
                  src="https://www.youtube.com/embed/NXmYBg84uc8"
                  title="Bakery Consejo"
                  className="bakery-tips-video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
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
