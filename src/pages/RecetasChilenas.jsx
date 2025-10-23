import React from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import "../styles/BakeryStyles.css";
import bakeryFondo from "../assets/img/fondo/bakerysimpleinside.jpg";

export default function BakeryRecetas() {
  return (
    <div className="bakery-recetas-page d-flex flex-column min-vh-100">
 

      <main className="bakery-recetas-main flex-grow-1">
        <div
          className="bakery-recetas-background d-flex flex-column align-items-center justify-content-start py-5"
          style={{ backgroundImage: `url(${bakeryFondo})` }}
        >
          <div className="bakery-recetas-content container text-center">
            <h1 className="bakery-recetas-title mb-4">Recetas Chilenas</h1>
            <p className="bakery-recetas-description mb-4">
              Aquí puedes ver muchas recetas de repostería orientadas a nuestra cultura gastronómica.
            </p>

            <div className="bakery-recetas-iframe-section mt-5 col-12 col-md-10 mx-auto">
              <h3 className="bakery-recetas-iframe-title mb-3">Recetas Chilenas Gourmet</h3>

              <div className="bakery-recetas-iframe-wrapper ratio ratio-16x9">
                <iframe
                  src="https://www.gourmet.cl/tipo-plato/dulces-y-postres-chilenos/"
                  title="Recetas Gourmet"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="bakery-recetas-iframe"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </main>


    </div>
  );
}
