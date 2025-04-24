import "../../styles/custom.css";
import { Col, Form, Row, Container } from "react-bootstrap";
import { ProductCard } from "../../components/ProductCard";
import { useProductDetailContext } from "../../context/ProductProvider";

export function SolarLight() {
  const { superSaleList, productList, nextPage, isMore } =
    useProductDetailContext();

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
          className="btn btn-outline-primary btn-lg"
        >
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
            đại, giúp giảm lóa mắt, bảo vệ thị lực, tiết kiệm chi phí điện và
            thân thiện với môi trường. Với công nghệ tán xạ ánh sáng và cảm biến
            thông minh, đèn giúp tăng hiệu quả chiếu sáng mà không gây khó chịu
            cho mắt. Sản phẩm này rất phù hợp cho các khu vực như sân vườn, công
            viên, đường phố và các khu vực công cộng khác.
          </p>
        </div>

        {/* Lý do chọn đèn năng lượng mặt trời chống chói */}
        <div className="mt-5">
          <h2 className="fw-bold text-danger">
            I. Vì Sao Nên Chọn Đèn Năng Lượng Mặt Trời Chống Chói?
          </h2>
          <p className="fs-5">
            Đèn năng lượng mặt trời ngày càng phổ biến trong các gia đình, công
            trình công cộng và khu công nghiệp. Đây là lựa chọn tiết kiệm, an
            toàn và bền bỉ, đáp ứng nhu cầu chiếu sáng hiện đại.
          </p>

          <Row className="mt-3">
            <Col md={6}>
              <h4 className="fw-bold text-dark">
                1. Công Nghệ Giảm Lóa, Bảo Vệ Mắt
              </h4>
              <p>
                Công nghệ giảm lóa, bảo vệ mắt là điểm nổi bật của đèn năng
                lượng mặt trời hiện đại. Nhờ sử dụng chip LED cao cấp kết hợp
                thấu kính tán sáng thông minh, đèn giúp giảm chói lóa hiệu quả,
                mang lại ánh sáng dịu nhẹ, ổn định và dễ chịu cho mắt. Điều này
                đặc biệt quan trọng khi lắp đặt tại sân vườn, cổng nhà hay lối
                đi, nơi có người thường xuyên tiếp xúc trực tiếp với nguồn sáng.
                Công nghệ này không chỉ bảo vệ thị lực cho người già và trẻ nhỏ
                mà còn tạo cảm giác thoải mái khi sử dụng lâu dài. Giải pháp lý
                tưởng cho chiếu sáng ngoài trời vừa an toàn vừa hiện đại.
              </p>
            </Col>
            <Col md={6}>
              <h4 className="fw-bold text-dark">2. Tiết Kiệm Chi Phí Điện</h4>
              <p>
                Tiết kiệm chi phí điện là ưu điểm lớn của đèn năng lượng mặt
                trời so với đèn truyền thống. Đèn hoạt động hoàn toàn bằng năng
                lượng mặt trời, không cần kết nối điện lưới nên không phát sinh
                chi phí điện hàng tháng. Sau khi lắp đặt, người dùng gần như
                không phải trả thêm chi phí vận hành nào, phù hợp cho cả gia
                đình và doanh nghiệp muốn cắt giảm hóa đơn điện. Đặc biệt ở khu
                vực có nhiều nắng như Việt Nam, đèn hoạt động hiệu quả quanh
                năm. Đây là giải pháp chiếu sáng thông minh, tiết kiệm và thân
                thiện với môi trường.
              </p>
            </Col>
            <Col md={6}>
              <h4 className="fw-bold text-dark">3. Độ Bền Cao, Chống Nước</h4>
              <p>
                Độ bền cao, chống nước là yếu tố then chốt giúp đèn năng lượng
                mặt trời hoạt động ổn định trong mọi điều kiện thời tiết. Hầu
                hết các mẫu đèn hiện nay đều đạt chuẩn chống nước IP65 hoặc
                IP67, có khả năng chống mưa lớn, bụi bẩn và độ ẩm cao. Vỏ đèn
                làm từ nhôm đúc hoặc nhựa ABS chịu lực, chống gỉ sét và chịu
                được va đập nhẹ. Nhờ đó, đèn có thể lắp đặt ngoài trời tại sân
                vườn, cổng nhà, bãi xe… mà không lo hư hỏng. Độ bền cao giúp
                người dùng yên tâm sử dụng lâu dài, không tốn kém chi phí thay
                thế thường xuyên.
              </p>
            </Col>
            <Col md={6}>
              <h4 className="fw-bold text-dark">4. Cảm Biến Thông Minh</h4>
              <p>
                Cảm biến thông minh là tính năng hiện đại giúp đèn năng lượng
                mặt trời hoạt động tự động và tiết kiệm năng lượng tối đa. Nhờ
                cảm biến ánh sáng, đèn có thể tự động bật khi trời tối và tắt
                khi trời sáng, hoàn toàn không cần thao tác thủ công. Một số mẫu
                còn tích hợp cảm biến chuyển động, chỉ bật sáng khi phát hiện
                người đến gần, giúp tăng cường an ninh và tiết kiệm pin. Tính
                năng này đặc biệt hữu ích tại lối đi, sân vườn hoặc khu vực ít
                người qua lại. Giải pháp chiếu sáng thông minh, tiện lợi và thân
                thiện với người dùng hiện đại.
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
          lựa chọn phổ biến khi cần chiếu sáng diện rộng như sân vườn, bãi xe, nhà xưởng hoặc khu vực công cộng. Nhờ thiết kế góc chiếu rộng và công suất lớn, đèn cho ánh sáng mạnh mẽ, đồng đều nhưng vẫn được tích hợp công nghệ chống chói, giúp hạn chế lóa mắt khi nhìn trực tiếp. Đèn thường đi kèm remote điều khiển từ xa và pin dung lượng cao, có thể chiếu sáng suốt 10–12 giờ sau mỗi lần sạc. Khả năng chống nước tốt, độ bền cao và lắp đặt dễ dàng giúp đèn pha trở thành giải pháp chiếu sáng ngoài trời tối ưu và tiết kiệm.
          </p>

          <h4 className="fw-bold text-dark mt-3">
            2. Đèn Đường Năng Lượng Mặt Trời (Street Light)
          </h4>
          <p>
          giải pháp chiếu sáng lý tưởng cho các tuyến đường, ngõ hẻm, khu dân cư và công viên. Với thiết kế trụ cao, góc chiếu xa và tích hợp cảm biến thông minh, đèn tự động bật sáng khi trời tối và điều chỉnh độ sáng theo chuyển động người. Công nghệ giảm chói hiện đại giúp ánh sáng lan tỏa đều, không gây lóa mắt, đảm bảo an toàn cho người đi đường. Vỏ đèn được làm từ vật liệu bền chắc, chống nước, chống gỉ sét, hoạt động bền bỉ trong mọi điều kiện thời tiết. Đây là lựa chọn hiệu quả và tiết kiệm cho các dự án chiếu sáng công cộng hiện đại.
          </p>

          <h4 className="fw-bold text-dark mt-3">
            3. Đèn Trong Nhà Năng Lượng Mặt Trời
          </h4>
          <p>
          lựa chọn hoàn hảo cho những khu vực không có điện lưới ổn định như vùng sâu vùng xa, nhà vườn, chòi canh hoặc trại nuôi. Đèn thường đi kèm tấm pin rời đặt ngoài trời và dây nối dài, cho phép lắp đặt linh hoạt trong phòng khách, bếp, phòng ngủ hoặc nhà kho. Nhờ công nghệ chống chói, đèn mang lại ánh sáng êm dịu, không gây mỏi mắt khi sử dụng lâu dài. Nhiều mẫu còn tích hợp sạc điện thoại USB và điều khiển từ xa tiện lợi. Đây là giải pháp chiếu sáng tiết kiệm, bền bỉ và thân thiện với môi trường cho cuộc sống hàng ngày.
          </p>
        </div>

        {/* Bảng giá cập nhật */}
        <div className="mt-5">
          <h2 className="fw-bold text-danger">
            III. Bảng Giá Cập Nhật 2025
          </h2>

          <ul>
            <li>🔹 Đèn pha năng lượng 100W: 950.000 - 1.250.000 VNĐ</li>
            <li>🔹 Đèn pha năng lượng 200W: 1.400.000 - 1.900.000 VNĐ</li>
            <li>🔹 Đèn đường năng lượng 300W: 2.000.000 - 2.600.000 VNĐ</li>
            <li>🔹 Đèn cao cấp cảm biến AI: từ 3.000.000 VNĐ</li>
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
            Việc lắp đặt đèn năng lượng mặt trời khá đơn giản, chỉ cần 15
            phút:
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
            <li>✅ Cam kết 100% hàng chính hãng, bảo hành 3 năm.</li>
            <li>✅ 1 đổi 1 trong 30 ngày nếu lỗi từ nhà sản xuất.</li>
            <li>
              ✅ Giao hàng toàn quốc, miễn phí vận chuyển đơn trên 1.000.000
              VNĐ.
            </li>
            <li>
              ✅ Hỗ trợ lắp đặt miễn phí với đơn hàng trên 3.000.000 VNĐ.
            </li>
          </ul>
        </div>

        {/* Kết luận */}
        <div className="p-4 bg-light text-dark rounded shadow-sm mt-5">
          <h3 className="fw-bold text-center">Liên Hệ Ngay Để Được Tư Vấn!</h3>
          <p className="fs-5 text-center">
            Solar TP cung cấp đèn năng lượng mặt trời chính hãng, giá tốt, hỗ
            trợ tư vấn nhiệt tình. Hãy liên hệ ngay để được tư vấn và nhận ưu
            đãi hấp dẫn!
          </p>
          <p className="text-center"><strong>📞 Hotline: 0972769364</strong></p>
        </div>
      </Container>
    </>
  );
}
