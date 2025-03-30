import "../../styles/custom.css";
import { Col, Form, Row, Container } from "react-bootstrap";
import { ProductCard } from "../../components/ProductCard";
import { useProductDetailContext } from "../../context/ProductProvider";

export function SolarLight() {
  const { superSaleList, productList, nextPage, isMore } = useProductDetailContext();

  return (
    <>
      {/* Tiêu đề chính */}
      <h1 className="text-primary text-center fw-bold my-4">
        Đèn năng lượng mặt trời chống chói, chống lóa
      </h1>

      {/* Mô tả sản phẩm */}
      <div className=" bg-light text-dark rounded shadow-sm p-1">
        <p className="fs-5 text-justify">
          Đèn năng lượng mặt trời chống chói, chống lóa giúp chiếu sáng hiệu quả
          mà không gây nhức mắt. Công nghệ khuếch tán ánh sáng giảm lóa, bảo vệ
          mắt. Tiết kiệm điện, bền bỉ, chống nước, phù hợp lắp đặt sân vườn,
          đường phố. Hoạt động tự động, thân thiện môi trường, tối ưu chi phí.
        </p>
      </div>

      {/* Sản phẩm bán chạy */}
      <div className="hot-sale-section rounded-4 mt-3 bg-danger text-white ">
        <div className="d-flex justify-content-center text-center mt-2">
          <h4 className="fw-bold d-flex align-items-center mt-2">
            <i className="bi bi-fire me-2"></i> SẢN PHẨM BÁN CHẠY TRONG THÁNG{" "}
            <i className=" ms-2 bi bi-fire"></i>
          </h4>
        </div>

        <Row className="mb-3 gx-1 m-1">
          {superSaleList.slice(0, 4).map((product) => (
            <Col key={product.id} xs={6} md={6} lg={3}>
              <ProductCard
                id={product.id}
                description={product.description}
                name={product.name}
                slug={product.slug}
                image={
                  product.images.find((item) => item.isThumbnail)?.imageUrl ||
                  ""
                }
                priceOld={product.oldPrice}
                priceNew={product.newPrice}
              />
            </Col>
          ))}
        </Row>
      </div>

      {/* Bộ lọc sắp xếp */}
      <div
        className="d-flex align-items-center gap-2 mt-5"
        style={{ objectFit: "cover" }}
      >
        <Form.Select
          className="custom-select-filter"
          style={{ fontSize: "1.2rem", width: "12rem" }}
        >
          <option value="default">Sắp xếp mặc định</option>
          <option value="price-asc">Giá thấp đến cao</option>
          <option value="price-desc">Giá cao đến thấp</option>
          <option value="newest">Mới nhất</option>
          <option value="bestseller">Bán chạy nhất</option>
        </Form.Select>
        <span className="text-muted fs-4">
          {" "}
          của {productList.length} sản phẩm
        </span>
      </div>

      {/* Danh sách sản phẩm */}
      <div className="mt-4 bg-light p-2">
        <Row className="gx-1">
          {productList.map((product) => (
            <Col key={product.id} xs={6} md={6} lg={3}>
              <ProductCard
                id={product.id}
                description={product.description}
                name={product.name}
                slug={product.slug}
                image={
                  product.images.find((item) => item.isThumbnail)?.imageUrl ||
                  ""
                }
                priceOld={product.oldPrice}
                priceNew={product.newPrice}
              />
            </Col>
          ))}
        </Row>
      </div>
      {/* Nút xem thêm */}
      <div className="text-center mt-4">
        <button
        onClick={() => nextPage()}
        className="btn btn-outline-primary btn-lg">

          {isMore ? "Trang cuối" : "Xem thêm sản phẩm"}
          <i className="bi bi-chevron-down"></i>
        </button>
      </div>

      <Container className="mt-5">
        {/* Tiêu đề chính */}
        <h1 className="text-primary text-center fw-bold mb-4">
          Đèn Năng Lượng Mặt Trời Chống Chói - Giải Pháp Chiếu Sáng Thông Minh
        </h1>

        {/* Giới thiệu chung */}
        <div className="p-4 bg-light text-dark rounded shadow-sm">
          <p className="fs-5">
            Đèn năng lượng mặt trời chống chói là dòng sản phẩm chiếu sáng hiện
            đại, giúp **giảm lóa mắt, bảo vệ thị lực, tiết kiệm chi phí điện**
            và **thân thiện với môi trường**. Với công nghệ **tán xạ ánh sáng và
            cảm biến thông minh**, đèn giúp tăng hiệu quả chiếu sáng mà không
            gây khó chịu.
          </p>
        </div>

        {/* Lý do chọn đèn năng lượng mặt trời chống chói */}
        <div className="mt-5">
          <h2 className="fw-bold text-danger">
            I. Vì Sao Nên Chọn Đèn Năng Lượng Mặt Trời Chống Chói?
          </h2>
          <p className="fs-5">
            Đèn năng lượng mặt trời ngày càng phổ biến trong các gia đình, công
            trình công cộng và khu công nghiệp. Đây là lựa chọn **tiết kiệm, an
            toàn và bền bỉ**, đáp ứng nhu cầu chiếu sáng hiện đại.
          </p>

          <Row className="mt-3">
            <Col md={6}>
              <h4 className="fw-bold text-dark">
                1. Công Nghệ Giảm Lóa, Bảo Vệ Mắt
              </h4>
              <p>
                Sử dụng **thấu kính tán xạ ánh sáng** giúp ánh sáng dịu nhẹ hơn,
                không gây chói mắt ngay cả khi nhìn trực tiếp.
              </p>
            </Col>
            <Col md={6}>
              <h4 className="fw-bold text-dark">2. Tiết Kiệm Chi Phí Điện</h4>
              <p>
                **Sử dụng 100% năng lượng mặt trời**, giảm chi phí tiền điện mỗi
                tháng, phù hợp với nhu cầu sử dụng lâu dài.
              </p>
            </Col>
            <Col md={6}>
              <h4 className="fw-bold text-dark">3. Độ Bền Cao, Chống Nước</h4>
              <p>
                Đèn đạt chuẩn **IP65/IP67**, chống bụi, chống nước, hoạt động
                bền bỉ dưới mọi điều kiện thời tiết.
              </p>
            </Col>
            <Col md={6}>
              <h4 className="fw-bold text-dark">4. Cảm Biến Thông Minh</h4>
              <p>
                Một số mẫu đèn có **cảm biến tự động bật/tắt** và **cảm biến
                chuyển động**, giúp tiết kiệm điện hơn.
              </p>
            </Col>
          </Row>
        </div>

        {/* Phân loại đèn năng lượng mặt trời */}
        <div className="mt-5">
          <h2 className="fw-bold text-danger">
            II. Các Dòng Đèn Năng Lượng Mặt Trời Chống Chói Phổ Biến
          </h2>

          <h4 className="fw-bold text-dark mt-3">
            1. Đèn Pha Năng Lượng Mặt Trời (Flood Light)
          </h4>
          <p>
            **Công suất từ 100W - 500W**, phù hợp chiếu sáng **sân vườn, kho
            bãi, công trình**.
          </p>

          <h4 className="fw-bold text-dark mt-3">
            2. Đèn Đường Năng Lượng Mặt Trời (Street Light)
          </h4>
          <p>
            **Chiếu sáng đường phố, bãi đậu xe, khu công cộng**, thời gian chiếu
            sáng lên đến **12 - 15 giờ**.
          </p>

          <h4 className="fw-bold text-dark mt-3">
            3. Đèn Trong Nhà Năng Lượng Mặt Trời
          </h4>
          <p>
            **Dùng chiếu sáng ban công, nhà kho, khu vực sinh hoạt**, không cần
            kết nối nguồn điện.
          </p>
        </div>

        {/* Bảng giá cập nhật */}
        <div className="mt-5">
          <h2 className="fw-bold text-danger">
            III. Bảng Giá Cập Nhật (Tháng 3/2025)
          </h2>

          <ul>
            <li>🔹 **Đèn pha năng lượng 100W**: 950.000 - 1.250.000 VNĐ</li>
            <li>🔹 **Đèn pha năng lượng 200W**: 1.400.000 - 1.900.000 VNĐ</li>
            <li>🔹 **Đèn đường năng lượng 300W**: 2.000.000 - 2.600.000 VNĐ</li>
            <li>🔹 **Đèn cao cấp cảm biến AI**: từ 3.000.000 VNĐ</li>
          </ul>
          <p className="text-muted">
            (* Giá có thể thay đổi tùy thuộc vào thương hiệu và công nghệ đi
            kèm)
          </p>
        </div>

        {/* Hướng dẫn lắp đặt */}
        <div className="mt-5">
          <h2 className="fw-bold text-danger">IV. Hướng Dẫn Lắp Đặt</h2>
          <p className="fs-5">
            Việc lắp đặt đèn năng lượng mặt trời khá đơn giản, chỉ cần **15
            phút**:
          </p>
          <ol>
            <li>📍 Xác định vị trí lắp đặt có ánh nắng tốt nhất.</li>
            <li>🔧 Dùng khoan để cố định giá đỡ đèn và tấm pin.</li>
            <li>🔌 Kết nối dây nguồn giữa đèn và tấm pin.</li>
            <li>📡 Kiểm tra chế độ hoạt động và điều chỉnh bằng remote.</li>
          </ol>
        </div>

        {/* Lợi ích khi mua tại Solar TP */}
        <div className="mt-5">
          <h2 className="fw-bold text-danger">
            V. Lợi Ích Khi Mua Tại Solar TP
          </h2>
          <ul>
            <li>✅ **Cam kết 100% hàng chính hãng, bảo hành 24 tháng**.</li>
            <li>✅ **1 đổi 1 trong 30 ngày nếu lỗi từ nhà sản xuất**.</li>
            <li>
              ✅ **Giao hàng toàn quốc, miễn phí vận chuyển đơn trên 1.000.000
              VNĐ**.
            </li>
            <li>
              ✅ **Hỗ trợ lắp đặt miễn phí với đơn hàng trên 3.000.000 VNĐ**.
            </li>
          </ul>
        </div>

        {/* Kết luận */}
        <div className="p-4 bg-light text-dark rounded shadow-sm mt-5">
          <h3 className="fw-bold text-center">Liên Hệ Ngay Để Được Tư Vấn!</h3>
          <p className="fs-5 text-center">
            Solar TP cung cấp **đèn năng lượng mặt trời chính hãng, giá tốt, hỗ
            trợ tư vấn nhiệt tình**. Hãy liên hệ ngay để được tư vấn và nhận ưu
            đãi hấp dẫn!
          </p>
        </div>
      </Container>
    </>
  );
}
