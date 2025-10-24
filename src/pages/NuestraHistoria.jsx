import React from 'react';
import '../styles/NuestraHistoria.css';

import pasteleria70 from '../assets/img/fondo/pasteleria_70.png';
import record from '../assets/img/fondo/record.jpeg';
import postres from '../assets/img/fondo/p_postres.jpg';
import prep from '../assets/img/fondo/prep.jpg';
import ecommerce from '../assets/img/fondo/e-comerce.png';
import torta50a from '../assets/img/fondo/torta_50a.png';

export default function NuestraHistoria() {
  return (
    <div className="historia-page">
      <main className="historia-main">
        <section className="historia-section">
          <h2 className="historia-title">Nuestra Historia</h2>
          <div className="historia-timeline">

            <div className="historia-item left">
              <div className="historia-content">
                <h4>1975 – Fundación de la Pastelería</h4>
                <p>
                  La historia de Mil Sabores comienza en 1975 como un pequeño emprendimiento familiar en Chile. Inspirados en
                  recetas tradicionales transmitidas de generación en generación, los fundadores se propusieron crear un
                  espacio donde las familias pudieran disfrutar de tortas y postres artesanales hechos con dedicación y
                  cariño.
                </p>
              </div>
              <div className="historia-image">
                <img src={pasteleria70} alt="Pastelería 1975" className="img-fluid rounded" />
              </div>
            </div>

            <div className="historia-item right">
              <div className="historia-image">
                <img src={record} alt="Record Guinness" className="img-fluid rounded" />
              </div>
              <div className="historia-content">
                <h4>1995 – Récord Guinness</h4>
                <p>
                  Un hecho inolvidable marcó la trayectoria de la pastelería: la participación en la creación de la torta más
                  grande del mundo, reconocida oficialmente por el Récord Guinness.
                </p>
              </div>
            </div>

            <div className="historia-item left">
              <div className="historia-content">
                <h4>2000 – Expansión del catálogo</h4>
                <p>
                  A partir del año 2000, se ampliaron las categorías de productos incluyendo alternativas sin azúcar, sin
                  gluten y veganas, logrando que más personas pudieran disfrutar de la dulzura sin restricciones.
                </p>
              </div>
              <div className="historia-image">
                <img src={postres} alt="exp_cat" className="img-fluid rounded" />
              </div>
            </div>

            <div className="historia-item right">
              <div className="historia-image">
                <img src={prep} alt="prep" className="img-fluid rounded" />
              </div>
              <div className="historia-content">
                <h4>2010 – Innovación tecnológica</h4>
                <p>
                  En la década de 2010, la pastelería dio un paso importante hacia la modernización, incorporando nuevas
                  tecnologías de producción y sistemas de control de calidad.
                </p>
              </div>
            </div>

            <div className="historia-item left">
              <div className="historia-content">
                <h4>2023 – Proyecto de e-commerce</h4>
                <p>
                  Mil Sabores inició el desarrollo de su propia tienda online en 2023, permitiendo personalizar pedidos y
                  acceder a promociones exclusivas desde casa.
                </p>
              </div>
              <div className="historia-image">
                <img src={ecommerce} alt="ecom" className="img-fluid rounded" />
              </div>
            </div>

            <div className="historia-item right">
              <div className="historia-image">
                <img src={torta50a} alt="50a" className="img-fluid rounded" />
              </div>
              <div className="historia-content">
                <h4>2025 - 50° Aniversario</h4>
                <p>
                  En 2025, Mil Sabores celebra su 50 aniversario, reafirmando su compromiso con la innovación y la tradición.
                </p>
              </div>
            </div>

          </div>
        </section>
      </main>

    </div>
  );
}
