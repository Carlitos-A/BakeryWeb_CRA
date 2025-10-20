import React from 'react'
import { useCart } from '../components/CartContext'
import {
  PrevButton,
  NextButton,
  usePrevNextButtons
} from './EmblaCarouselArrowButtons'
import useEmblaCarousel from 'embla-carousel-react'
import { masVendidos } from '../constantes/masVendidos'

const EmblaCarousel = ({ options }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options)
  const { addToCart } = useCart()


  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi)

  return (
    <section className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {masVendidos.map((product, index) => (
            <div className="embla__slide" key={index}>
              <div className="card">
                <img
                  src={product.img}
                  className="card-img-top"
                  alt={product.alt}
                />
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <p className="small">
                      <a href={product.categoryLink} className="text-muted">
                        {product.category}
                      </a>
                    </p>
                    {product.originalPrice && (
                      <p className="small text-danger">
                        <s>{product.originalPrice}</s>CLP
                      </p>
                    )}
                  </div>

                  <div className="d-flex justify-content-between mb-3">
                    <h5 className="mb-0">{product.title}</h5>
                    <h5 className="text-dark mb-0">{product.price} CLP</h5>
                    <h5 className="text-dark mb-0">{product.price}CLP</h5>
                    
                  </div>

                  <div className="text-center mt-2">
                    <button
                      className="btn btn-color-car btn-sm"
                      onClick={() => addToCart(product)}
                    >

                      Agregar al carrito
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Controles */}
      <div className="embla__controls">
        <div className="embla__buttons">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
      </div>
    </section>
  )
}

export default EmblaCarousel
