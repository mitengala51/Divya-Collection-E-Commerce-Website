import ci_2 from "../../assets/ci_2.jpg";
import ci_3 from "../../assets/ci_3.jpg";
import ci_4 from '../../assets/ci_6.jpg'

export default function Carousel() {
  return (
    <>
      <div id="myCarousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#myCarousel"
            data-bs-slide-to="0"
            className=""
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#myCarousel"
            data-bs-slide-to="1"
            aria-label="Slide 2"
            className=""
          ></button>
          <button
            type="button"
            data-bs-target="#myCarousel"
            data-bs-slide-to="2"
            aria-label="Slide 3"
            className="active"
            aria-current="true"
          ></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item">
            <img
              src={ci_4}
              alt="Product"
              style={{ width: "100%", height: "560px", objectFit: "cover" }}
            />

            <div className="container">
              <div className="carousel-caption text-start">
                <h1>Classic Elegance</h1>
                <p>
                Discover our handpicked collection of stylish footwear, chic purses,<br></br> and everyday essentials crafted just for her. Step into fashion made <br></br> for every walk of life.
                </p>
                <p>
                  {/* <a className="btn btn-lg btn-primary" href="#">
                    Sign up today
                  </a> */}
                </p>
              </div>
            </div>
          </div>
          <div className="carousel-item">

            <img
              src={ci_2}
              alt="Product"
              style={{ width: "100%", height: "560px", objectFit: "cover" }}
            />

            <div className="container">
              <div className="carousel-caption">
                <h1>Built for Comfort. Styled for You.</h1>
                <p>
                Explore sleek formal shoes, rugged sandals, and casual must-haves designed for modern men. Step up your look with ease and attitude.
                </p>
                <p>
                  {/* <a className="btn btn-lg btn-primary" href="#">
                    Learn more
                  </a> */}
                </p>
              </div>
            </div>
          </div>
          <div className="carousel-item active">
            <img
              src={ci_3}
              alt="Product"
              style={{ width: "100%", height: "560px", objectFit: "cover" }}
            />

            <div className="container">
              <div className="carousel-caption text-end">
                <h1>Carry Power in Style</h1>
                <p>
                Sleek laptop bags and professional carriers designed for durability, <br></br> functionality, and the everyday hustle. Stay organized, look sharp.
                </p>
                <p>
                  {/* <a className="btn btn-lg btn-primary" href="#">
                    Browse gallery
                  </a> */}
                </p>
              </div>
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#myCarousel"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#myCarousel"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </>
  );
}
