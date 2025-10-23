import React from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import "../styles/BakeryStyles.css";
import bakeryFondo from "../assets/img/fondo/bakerysimpleinside.jpg";

export default function BakeryNews() {
  return (
    <div className="bakery-news-page d-flex flex-column min-vh-100">
      

      <main className="bakery-news-main flex-grow-1">
        <div
          className="bakery-news-background d-flex flex-column align-items-center justify-content-start py-5"
          style={{ backgroundImage: `url(${bakeryFondo})` }}
        >
          <div className="bakery-news-content container text-center">
            <h1 className="bakery-news-title mb-4">Bakery News</h1>
            <p className="bakery-news-description mb-4">
              Aquí puedes ver noticias de carácter internacional
            </p>

            <div className="bakery-news-iframe-section mt-5 col-12 col-md-10 mx-auto">
              <h3 className="bakery-news-iframe-title mb-3">Blog Cocina</h3>

              <div className="bakery-news-iframe-wrapper ratio ratio-16x9">
                <iframe
                  src="https://www.univision.com/temas/pasteleria"
                  title="Noticias DUOC"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="bakery-news-iframe"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </main>

    
    </div>
  );
}
