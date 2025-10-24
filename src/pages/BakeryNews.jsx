import React from "react";
import "../styles/BakeryStyles.css";
import bakeryFondo from "../assets/img/fondo/bakerysimpleinside.jpg";

export default function BakeryNews() {
  return (
    <div className="news-page">
      <main className="news-main">
        <div
          className="news-background"
          style={{ backgroundImage: `url(${bakeryFondo})` }}
        >
          <div className="news-content">
            <h1 className="news-title">Bakery News</h1>
            <p className="news-description">
              Aquí puedes ver noticias de carácter internacional
            </p>

            <div className="news-iframe-section">
              <h3 className="news-iframe-title">Blog Cocina</h3>
              <div className="news-iframe-wrapper">
                <iframe
                  src="https://www.univision.com/temas/pasteleria"
                  title="Noticias DUOC"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="news-iframe"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
