import React from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import '../styles/style.css';

export default function NuestraHistoria() {
  return (
    <div className="d-flex flex-column min-vh-100 bg-custom">

      <main className="flex-grow-1">
        <section className="container-fluid my-5">
          <h2 className="text-center text-black">Nuestra Historia</h2>
          <div className="timeline">

            {/* 1975 – Fundación */}
            <div className="timeline-item left text-black">
              <div className="content1">
                <h4>1975 – Fundación de la Pastelería</h4>
                <p>
                  La historia de Mil Sabores comienza en 1975 como un pequeño emprendimiento familiar en Chile. Inspirados en
                  recetas tradicionales transmitidas de generación en generación, los fundadores se propusieron crear un
                  espacio donde las familias pudieran disfrutar de tortas y postres artesanales hechos con dedicación y
                  cariño. Desde el primer día, el compromiso con la calidad y el sabor auténtico fue el sello que distinguió
                  a la pastelería frente a otros negocios del rubro.
                </p>
              </div>
            </div>

            {/* 1995 – Récord Guinness */}
            <div className="timeline-item right text-black">
              <div className="image">
                <img src="/productos/record.jpeg" alt="Record Guinness" className="img-fluid rounded" />
              </div>
              <div className="content1">
                <h4>1995 – Récord Guinness</h4>
                <p>
                  Un hecho inolvidable marcó la trayectoria de la pastelería: la participación en la creación de la torta más
                  grande del mundo, que logró ser reconocida oficialmente por el Récord Guinness. Este acontecimiento no solo
                  fue un orgullo para la empresa, sino también para la comunidad, ya que puso en alto el nombre de la
                  repostería chilena a nivel internacional. A partir de este momento, Mil Sabores pasó de ser una
                  pastelería reconocida localmente a un verdadero referente nacional.
                </p>
              </div>
            </div>

            {/* 2000 – Expansión */}
            <div className="timeline-item left text-black">
              <div className="content1">
                <h4>2000 – Expansión del catálogo</h4>
                <p>
                  Con el paso de los años, la pastelería comenzó a adaptarse a las nuevas necesidades de los clientes. A
                  partir del año 2000, se ampliaron las categorías de productos incluyendo alternativas sin azúcar, sin
                  gluten y veganas, logrando que más personas pudieran disfrutar de la dulzura sin restricciones. Esta
                  diversificación permitió llegar a un público más amplio y consolidar a Mil Sabores como una pastelería
                  inclusiva, preocupada por la salud y el bienestar de sus clientes.
                </p>
              </div>
              <div className="image">
                <img src="/productos/p_postres.jpg" alt="exp_cat" className="img-fluid rounded" />
              </div>
            </div>

            {/* 2010 – Innovación tecnológica */}
            <div className="timeline-item right text-black">
              <div className="image">
                <img src="/productos/prep.jpg" alt="prep" className="img-fluid rounded" />
              </div>
              <div className="content1">
                <h4>2010 – Innovación tecnológica</h4>
                <p>
                  En la década de 2010, la pastelería dio un paso importante hacia la modernización, incorporando nuevas
                  tecnologías de producción y sistemas de control de calidad. Esto permitió mantener la esencia artesanal de
                  los productos, pero con procesos más eficientes y seguros. Además, se profesionalizó la gestión interna,
                  lo que abrió la puerta a una mayor capacidad de producción sin perder el cuidado en los detalles que
                  siempre caracterizó a la marca.
                </p>
              </div>
            </div>

            {/* 2023 – Proyecto e-commerce */}
            <div className="timeline-item left text-black">
              <div className="content1">
                <h4>2023 – Proyecto de e-commerce</h4>
                <p>
                  Entendiendo los cambios en los hábitos de consumo y la importancia de lo digital, Mil Sabores inició el
                  desarrollo de su propia tienda online en 2023. Esta plataforma buscó mejorar la experiencia de los
                  clientes, permitiéndoles personalizar pedidos, acceder a promociones exclusivas y recibir sus productos en
                  casa con la misma calidad y frescura de siempre. Fue un gran salto hacia la innovación, reafirmando el
                  compromiso de la pastelería con ofrecer experiencias modernas sin dejar de lado la tradición.
                </p>
              </div>
              <div className="image">
                <img src="/productos/e-comerce.png" alt="ecom" className="img-fluid rounded" />
              </div>
            </div>

            {/* 2025 – 50° Aniversario */}
            <div className="timeline-item right text-black">
              <div className="image">
                <img src="/productos/torta_50a.png" alt="50a" className="img-fluid rounded" />
              </div>
              <div className="content1">
                <h4>2025 - 50° Aniversario</h4>
                <p>
                  En 2025, la Pastelería Mil Sabores celebra con orgullo su 50 aniversario, medio siglo creando momentos
                  dulces e inolvidables para miles de familias chilenas. Esta conmemoración no solo reconoce la trayectoria
                  de la empresa, sino también el esfuerzo de todas las personas que han formado parte de su historia:
                  fundadores, maestros pasteleros, colaboradores y clientes que han acompañado el camino. Con la mirada
                  puesta en el futuro, la pastelería reafirma su misión de seguir innovando y manteniendo viva la
                  tradición que la hizo única.
                </p>
              </div>
            </div>

          </div>
        </section>
      </main>

    </div>
  );
}
