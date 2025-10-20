import React from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import "../styles/style.css";


export default function Comunidad() {
  return (
    <div className="d-flex flex-column min-vh-100 bg-custom">

      <main className="flex-grow-1">

        <div
          className="w-100 d-flex justify-content-center align-items-start pt-5"
          style={{
            background: "url('/assets/img/fondo/bakerysimpleinside.jpg') center/cover no-repeat",
            minHeight: "100vh",
          }}
        >
          <div className="col-md-8 col-lg-6 bg-dark bg-opacity-50 p-5 rounded text-center text-white">
            <h1 className="mb-4 display-4 fw-bold">Bienvenido a la Baker Community</h1>

            <p className="mb-4 lead">
              Aquí podrás encontrar todo lo necesario para aprender y comunicarte con estudiantes y
              profesionales del área de Gastronomía (pastelería).
            </p>

         
            <div className="d-grid gap-3 col-10 mx-auto mt-4">
              <a
                href="https://butternutbakeryblog.com/"
                className="btn btn-color btn-lg fw-bold blog-btn"
                target="_blank"
                rel="noopener noreferrer"
              >
                Bakery Blog
              </a>
              <a
                href="https://www.duoc.cl/noticias/"
                className="btn btn-color btn-lg fw-bold noticias-btn"
                target="_blank"
                rel="noopener noreferrer"
              >
                Noticias
              </a>
              <a href="/consejosDUOC" className="btn btn-color btn-lg fw-bold consejos-btn">
                Consejos Estudiantes DUOC
              </a>
              <a
                href="https://www.recetasnestle.cl/categorias/pasteleria-chilena"
                className="btn btn-color btn-lg fw-bold recetas-btn"
                target="_blank"
                rel="noopener noreferrer"
              >
                Recetas
              </a>
            </div>

            <div className="comentarios-container mt-5 col-md-10 mx-auto">
              <h3 className="text-center mb-3 fw-bold">Déjanos tu consulta o comentario</h3>
              <form>
                <div className="mb-3">
                  <textarea
                    className="form-control comentario-textarea"
                    rows="4"
                    placeholder="Escribe tu mensaje aquí..."
                  ></textarea>
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-color enviar-btn">
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
