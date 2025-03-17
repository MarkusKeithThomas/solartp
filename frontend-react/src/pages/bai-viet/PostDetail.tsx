import { useParams, Link } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import newsItem from "../../assets/fakedata/newsitempost.json";
import { CustomBreadcrumb } from "../../layout/CustomBreadcrumb";
import { CardGotInfo } from "../../components/CardGotInfo";
import { TableOfContents } from "../../components/TableOfContents";
import { PopularArticles } from "../../components/PopularArticles";
import { NewsCard } from "../../components/NewsCard";
// 📌 Định nghĩa kiểu dữ liệu cho bài viết
interface NewsItem {
  id: number;
  title: string;
  description: string;
  image: string;
  url: string;
  date: string;
}

export function PostDetail() {
  const { slug } = useParams<{ slug: string }>(); // Lấy slug từ URL

  // 🔥 Chuyển title sang slug để so sánh
  const article: NewsItem | undefined = newsItem.find((item) => item.id === 1);

  console.log("🔍 Bài viết được tìm thấy:", article);

  if (!article) {
    return (
      <Container>
        <h2>Bài viết không tồn tại!</h2>
      </Container>
    );
  }

  // 🔥 Lấy ngày chỉnh sửa gần nhất
  const lastModified = new Date().toISOString();

  // 🔥 Schema Markup JSON-LD cho bài viết + Breadcrumbs
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    author: { "@type": "Person", name: "Tác giả Solar TP" },
    publisher: {
      "@type": "Organization",
      name: "Solar TP",
      logo: {
        "@type": "ImageObject",
        url: "https://yourwebsite.com/logo.png",
      },
    },
    datePublished: article.date,
    dateModified: lastModified,
    image: article.image,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://yourwebsite.com/bai-viet/${slug}`,
    },
    breadcrumb: {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Trang chủ",
          item: "https://yourwebsite.com/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Bài viết",
          item: "https://yourwebsite.com/bai-viet",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: article.title,
          item: `https://yourwebsite.com/bai-viet/${slug}`,
        },
      ],
    },
  };

  return (
    <Container
>
      <Row className="gx=0">
        <Col
          xs={12}
          md={0}
          lg={3}
          className="bg-light text-white text-center d-none d-lg-block"
        >
          <TableOfContents />
        </Col>
        <Col xs={12} md={12} lg={6} className="bg-light">
          {/* 🔥 SEO Metadata */}
          <Helmet>
            <title>{article.title} | Solar TP</title>
            <meta
              name="description"
              content={`${article.description}. Xem ngay để khám phá!`}
            />
            <meta property="og:title" content={article.title} />
            <meta property="og:description" content={article.description} />
            <meta property="og:image" content={article.image} />
            <meta
              property="og:url"
              content={`https://yourwebsite.com/bai-viet/${slug}`}
            />
            <script type="application/ld+json">
              {JSON.stringify(schemaMarkup)}
            </script>
          </Helmet>

          {/* 🔥 Breadcrumb SEO */}
          <CustomBreadcrumb hideOnNavbar={true} />

          <h1 className="mt-2 text-center mb-4">{article.title}</h1>
          <p>
            <strong>Ngày đăng:</strong> {article.date} |{" "}
            <strong>Cập nhật gần nhất:</strong>{" "}
            {new Date().toLocaleDateString()}
          </p>
          <div className="mt-3">
            <h2>Lý do nên chọn các loại đèn năng lượng1</h2>
            <p>
              "Tôi nghĩ họ có lẽ là những người am hiểu nhất thế giới về tấn
              công mạng. Khi biết nhóm đến từ Việt Nam, tôi thực sự thấy ngạc
              nhiên và thú vị", Ben Zhou chia sẻ với VnExpress sau vụ tấn công
              gây thiệt hại 400.000 ETH.
            </p>
            <p>
              "Tôi nghĩ họ có lẽ là những người am hiểu nhất thế giới về tấn
              công mạng. Khi biết nhóm đến từ Việt Nam, tôi thực sự thấy ngạc
              nhiên và thú vị", Ben Zhou chia sẻ với VnExpress sau vụ tấn công
              gây thiệt hại 400.000 ETH.
            </p>
          </div>
          <div className="d-flex justify-content-center">
            <img
              src={article.image}
              alt={article.title}
              className="img-fluid"
              loading="lazy"

            />
          </div>
          <div className="mt-4">
            <h2>Lý do nên chọn các loại đèn năng lượng2</h2>
            <p>
              "Tôi nghĩ họ có lẽ là những người am hiểu nhất thế giới về tấn
              công mạng. Khi biết nhóm đến từ Việt Nam, tôi thực sự thấy ngạc
              nhiên và thú vị", Ben Zhou chia sẻ với VnExpress sau vụ tấn công
              gây thiệt hại 400.000 ETH.
            </p>
            <p>
              "Tôi nghĩ họ có lẽ là những người am hiểu nhất thế giới về tấn
              công mạng. Khi biết nhóm đến từ Việt Nam, tôi thực sự thấy ngạc
              nhiên và thú vị", Ben Zhou chia sẻ với VnExpress sau vụ tấn công
              gây thiệt hại 400.000 ETH.
            </p>
          </div>
          <div className="mt-4 justify-content-center">
            <h2>Lý do nên chọn các loại đèn năng lượng3</h2>
            <p>
              "Tôi nghĩ họ có lẽ là những người am hiểu nhất thế giới về tấn
              công mạng. Khi biết nhóm đến từ Việt Nam, tôi thực sự thấy ngạc
              nhiên và thú vị", Ben Zhou chia sẻ với VnExpress sau vụ tấn công
              gây thiệt hại 400.000 ETH.
            </p>
            <p>
              "Tôi nghĩ họ có lẽ là những người am hiểu nhất thế giới về tấn
              công mạng. Khi biết nhóm đến từ Việt Nam, tôi thực sự thấy ngạc
              nhiên và thú vị", Ben Zhou chia sẻ với VnExpress sau vụ tấn công
              gây thiệt hại 400.000 ETH.
            </p>
          </div>
          <div className="d-flex justify-content-center">
            <img
              src={article.image}
              alt={article.title}
              className="img-fluid"
              loading="lazy"

            />
          </div>
          <div className="mt-4 justify-content-center">
            <h2>Lời khuyên cho người tiêu dùng4</h2>
            <p>
              "Tôi nghĩ họ có lẽ là những người am hiểu nhất thế giới về tấn
              công mạng. Khi biết nhóm đến từ Việt Nam, tôi thực sự thấy ngạc
              nhiên và thú vị", Ben Zhou chia sẻ với VnExpress sau vụ tấn công
              gây thiệt hại 400.000 ETH.
            </p>
            <p>
              "Tôi nghĩ họ có lẽ là những người am hiểu nhất thế giới về tấn
              công mạng. Khi biết nhóm đến từ Việt Nam, tôi thực sự thấy ngạc
              nhiên và thú vị", Ben Zhou chia sẻ với VnExpress sau vụ tấn công
              gây thiệt hại 400.000 ETH.
            </p>
          </div>
          <CardGotInfo />
          <Row className="gx-1 gy-1 mb-4 mt-2 bg-danger py-2">
            {newsItem
              .filter((news) => news.tag === "today")
              .slice(0, 10)
              .map((news) => (
                <Col xs={12} key={news.id}>
                  <NewsCard {...news} />
                </Col>
              ))}
          </Row>
        </Col>
        <Col
          xs={12}
          md={12}
          lg={3}
          className="bg-light text-white text-center"
        >
          <PopularArticles />
        </Col>
      </Row>
    </Container>
  );
}
