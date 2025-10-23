import React from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import "../styles/BakeryStyles.css";
import bakeryFondo from "../assets/img/fondo/bakerysimpleinside.jpg";

export default function BakeryTips() {
  return (
    <div className="bakery-tips-page d-flex flex-column min-vh-100">
    

      <main className="bakery-tips-main flex-grow-1">
        <div
          className="bakery-tips-background d-flex flex-column align-items-center justify-content-start py-5"
          style={{ backgroundImage: `url(${bakeryFondo})` }}
        >
          <div className="bakery-tips-content container text-center">
            <h1 className="bakery-tips-title mb-4">Bakery Consejos</h1>
            <p className="bakery-tips-description mb-4">
              Aquí tienes consejos para pastelería para tus próximas creaciones
            </p>

            <div className="bakery-tips-video-section mt-5 col-12 col-md-10 mx-auto">
              <h3 className="bakery-tips-video-title mb-3">Video Bakery</h3>

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
            </div>
          </div>
        </div>
      </main>
      
    </div>
  );
}
