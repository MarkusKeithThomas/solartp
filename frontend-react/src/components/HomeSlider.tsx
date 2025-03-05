import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/custom.css"; // Import CSS tùy chỉnh

export function HomeSlider() {
  return (
    <section className="container-fluid project-slider mb-3">
      <Carousel
        interval={3000}
        nextIcon={<i className="bi bi-chevron-right custom-carousel-icon"></i>}
        prevIcon={<i className="bi bi-chevron-left custom-carousel-icon"></i>}
      >
        {" "}
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/imgs/anh_banner1_home.jpg"
            alt="Dự án 1"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/imgs/anh_banner2_home.jpg"
            alt="Dự án 2"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/imgs/anh_banner3_home.jpg"
            alt="Dự án 3"
          />
        </Carousel.Item>
      </Carousel>
    </section>
  );
}
