import React from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import bakeryFondo from "../assets/img/fondo/bakerysimpleinside.jpg";
import "../styles/BakeryStyles.css"

export default function BakeryBlog() {
  return (
    <div className="bakery-blog d-flex flex-column min-vh-100">
      

      <main className="bakery-main flex-grow-1">
        <div
          className="bakery-background d-flex flex-column align-items-center justify-content-start py-5"
          style={{ backgroundImage: `url(${bakeryFondo})` }}
        >
          <div className="bakery-content container text-center">
            <h1 className="bakery-title mb-4">Gastronomia Blog</h1>
            <p className="bakery-description mb-4">
              Aquí puedes consultar las noticias y novedades de Gasronomia relacionadas con todo tipo de comidas.
            </p>

            <div className="bakery-iframe-section mt-5 col-12 col-md-10 mx-auto">
              <h3 className="bakery-iframe-title mb-3">Blog Cocina</h3>
              <div className="bakery-iframe-wrapper ratio ratio-16x9">
                <iframe
                  src="https://www.lazyblog.net/"
                  title="Noticias DUOC"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="bakery-iframe"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </main>

      
    </div>
  );
}
