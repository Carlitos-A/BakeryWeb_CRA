

import Header from '../components/header'
import Footer from '../components/footer'
import '../styles/style.css'
import Registro from '../pages/Registro.jsx'
import { masVendidos } from '../constantes/masVendidos'
import { reviews } from '../constantes/reviews'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'
import React, { useState, useEffect } from 'react';
import EmblaCarousel from '../components/EmblaCarousel'
import '../styles/embla.css'
import { Link } from 'react-router-dom'



export default function App() {
  const [startIndex, setIndex] = useState(0);
  const total = masVendidos.length;
  const SLIDE_COUNT = 3;
  const SLIDES = Array.from(Array(SLIDE_COUNT).keys());
  const OPTIONS = { align: 'start' };

  return (
    <div className="d-flex flex-column min-vh-100">

      {/* Hero */}
      <div
        className="w-100 hero-section position-relative"
        aria-label="Imagen de fondo - Bakery"
      >
        <div
          id="carouselExampleSlidesOnly"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            <div
              className="carousel-item active mj-hero slide-1"
              data-bs-interval="2000"
            ></div>
            <div
              className="carousel-item mj-hero slide-2"
              data-bs-interval="2000"
            ></div>
            <div
              className="carousel-item mj-hero slide-3"
              data-bs-interval="2000"
            ></div>
          </div>
        </div>

        <div className="position-absolute top-50 start-50 translate-middle w-100 d-flex justify-content-center">
          <div className="position-relative d-flex flex-column justify-content-center align-items-center h-100">
            <div className="col-md-8 col-lg-6 bg-dark bg-opacity-50 p-5 rounded">
              <h1 className="mb-4 display-4 fw-bold text-white text-center">
                Mil sabores en un solo lugar
              </h1>
              <p className="mb-4 text-white text-center">
                Disfruta de pasteles, tortas y panes recién horneados, elaborados
                con ingredientes frescos y mucho amor. Haz tu pedido online y
                recíbelo en la comodidad de tu hogar.
              </p>
              <div className="text-center">
                <a href="Registro" className="btn btn-color btn-lg">
                  Registrarse
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* reseñas */}
      <main className="container my-5">
        <h2 className="text-center mb-4">Productos más vendidos</h2>

        <section>
          <EmblaCarousel slides={SLIDES} options={OPTIONS} />
        </section>

        <hr />

        <h2 className="text-center mb-4">Reseñas de clientes</h2>
        <div className="d-flex flex-column gap-3">
          {reviews.map((r) => (
            <div className="card shadow-sm" key={r.id}>
              <div className="card-body">
                <p className="card-text">"{r.text}"</p>
                <h6 className="fw-bold">- {r.author}</h6>
              </div>
            </div>
          ))}
        </div>

        <hr />
      </main>
    </div >
  )

}
