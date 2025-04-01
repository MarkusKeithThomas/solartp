import { Carousel } from "react-bootstrap";
import "../styles/custom.css";

export function HomeSlider() {
  return (
    <section className="container-fluid project-slider mb-3">
      <Carousel
        interval={4000}
        fade
        nextIcon={<i className="bi bi-chevron-right custom-carousel-icon"></i>}
        prevIcon={<i className="bi bi-chevron-left custom-carousel-icon"></i>}
      >
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/imgs/anh_banner1_home.webp"
            alt="Giải pháp điện mặt trời cho gia đình"
            width={1280}
            height={330}
            loading="eager"
            style={{
              objectFit: "cover",
              maxHeight: "330px",
            }}
          />
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/imgs/anh_banner2_home.webp"
            alt="Tấm pin năng lượng mặt trời chất lượng cao"
            width={1280}
            height={330}
            loading="lazy"
            style={{
              objectFit: "cover",
              maxHeight: "330px",
            }}
          />
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/imgs/anh_banner3_home.webp"
            alt="Đèn năng lượng mặt trời tiết kiệm điện"
            width={1280}
            height={330}
            loading="lazy"
            style={{
              objectFit: "cover",
              maxHeight: "330px",
            }}
          />
        </Carousel.Item>
      </Carousel>
    </section>
  );
}