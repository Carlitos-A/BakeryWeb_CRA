import React from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import "../styles/style.css";
import bakeryFondo from "../assets/img/fondo/bakerysimpleinside.jpg";

export default function BakeryBlog() {
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
            <h1 className="mb-4 display-5 fw-bold"> Gastronomia Blog</h1>
            <p className="mb-4 lead">
              Aquí puedes consultar las noticias y novedades de Gasronomia relacionadas con todo tipo de comidas.           </p>

            <div className="mt-5 col-12 col-md-10 mx-auto">
              <h3 className="text-center mb-3 fw-bold">Blog Cocina</h3>
              <div className="ratio ratio-16x9">
                <iframe
                  src="https://www.supermarketnews.com/grocery-categories/bakery"
                  title="Noticias DUOC"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  style={{ border: 0 }}
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </main>

    </div>
  );
}
