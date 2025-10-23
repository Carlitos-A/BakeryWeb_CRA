import React from "react";
import "../styles/style.css";
import bakeryFondo from "../assets/img/fondo/bakerysimpleinside.jpg";
import { Link } from "react-router-dom";

export default function Comunidad() {
  return (
    <div className="d-flex flex-column min-vh-100 bg-custom">
      <main className="flex-grow-1">
        <div
          className="d-flex flex-column align-items-center justify-content-start py-5"
          style={{
            background: `url(${bakeryFondo}) center/cover no-repeat`,
            minHeight: "100vh",
          }}
        >
          <div className="container bg-dark bg-opacity-50 p-5 rounded text-white text-center">
            <h1 className="mb-4 display-5 fw-bold">
              Bienvenido a la Baker Community
            </h1>

            <p className="mb-4 lead">
              Encuentra todo lo necesario para aprender, compartir y mantenerte
              informado sobre el mundo de la pastelería y tambien Gastronimia en general.
            </p>

            <div className="d-grid gap-3 col-10 mx-auto mt-4">

              <Link to="/bakeryBlog" className="btn btn-color btn-lg fw-bold">
                Gastronomia Blog
              </Link>


              <Link to="/bakeryNews" className="btn btn-color btn-lg fw-bold">
                Bakery News
              </Link>


              <Link to="/bakeryConsejos" className="btn btn-color btn-lg fw-bold">
                Consejos Bakery
              </Link>

              <Link to="/RecetasCHilenas" className="btn btn-color btn-lg fw-bold">
                Recetas Chilenas
              </Link>
            </div>

            <div className="mt-5 col-12 col-md-10 mx-auto">
              <h3 className="text-center mb-3 fw-bold">Blogs y Noticias</h3>
              <div className="ratio ratio-16x9">
                <iframe
                  src="https://www.biobiochile.cl/especial/food-service-2025/noticias/2025/10/10/destacan-impacto-de-feria-espacio-food-service-en-chile-anuncian-su-version-2026.shtml"
                  title="BioBio Noticias"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  style={{ border: 0 }}
                ></iframe>
              </div>
            </div>

            <div className="comentarios-container mt-5 col-md-10 mx-auto">
              <h3 className="text-center mb-3 fw-bold">
                Déjanos tu consulta o comentario
              </h3>
              <form>
                <div className="mb-3">
                  <textarea
                    className="form-control comentario-textarea"
                    rows="4"
                    placeholder="Escribe tu mensaje aquí..."
                  ></textarea>
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-color fw-bold">
                    Enviar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
