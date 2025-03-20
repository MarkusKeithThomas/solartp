import { useParams, Link } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import newsItem from "../../assets/fakedata/newsitempost.json";
import { CustomBreadcrumb } from "../../layout/CustomBreadcrumb";
import { CardGotInfo } from "../../components/CardGotInfo";
import { TableOfContents } from "../../components/TableOfContents";
import { PopularArticles } from "../../components/PopularArticles";
import { useArticleContext } from "../../context/ArticleProvider";
import { NewsCard } from "../../components/NewsCard";
import { formatContentForPost } from "../../ultities/formatContentForCardPost";

export function PostDetail() {
  const { slug } = useParams<{ slug: string }>(); // Lấy slug từ URL
  const { articles } = useArticleContext();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  // Lấy ngày hôm nay theo local timezone (YYYY-MM-DD)
  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
  const fifteenDaysAgo = new Date();
fifteenDaysAgo.setDate(fifteenDaysAgo.getDate() - 15);
const formattedDate = fifteenDaysAgo.toLocaleDateString("vi-VN");

  

  const articlePost = articles.find((item) => item.slugTitle === slug);

  if (!articlePost) {
    return (
      <Container>
        <h2>Bài viết không tồn tại!</h2>
        <p>Xin lỗi, chúng tôi không tìm thấy nội dung bạn đang tìm kiếm.</p>
        <Link to="/">Quay lại trang chủ</Link>
      </Container>
    );
  }

  // 🔥 Lấy ngày chỉnh sửa gần nhất
  const lastModified = new Date().toISOString();

  // 🔥 Schema Markup JSON-LD cho bài viết + Breadcrumbs
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "articlePost",
    headline: articlePost.title,
    author: { "@type": "Person", name: "Tác giả Solar TP" },
    publisher: {
      "@type": "Organization",
      name: "Solar TP",
      logo: {
        "@type": "ImageObject",
        url: "https://yourwebsite.com/logo.png",
      },
    },
    datePublished: articlePost.dateCreate,
    dateModified: lastModified,
    image: articlePost.image1Url,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${API_BASE_URL}/bai-viet/${slug}`,
    },
    breadcrumb: {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Trang chủ",
          item: `${API_BASE_URL}`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Bài viết",
          item: `${API_BASE_URL}/bai-viet`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: articlePost.title,
          item: `${API_BASE_URL}/bai-viet/${slug}`,
        },
      ],
    },
  };

  return (
<Container className="post-container mx-auto" style={{ maxWidth: "100vw", padding: 0 }}>
<Row className="gx-0 gy-0 p-0">
      <Col xs={12} md={3} lg={3} className="bg-light text-white text-center d-none d-lg-block">
          <TableOfContents />
        </Col>
        <Col xs={12} md={12} lg={6} className="bg-light p-3">
          {/* 🔥 SEO Metadata */}
          <Helmet>
            <title>{articlePost.title} | Solar TP</title>
            <meta
              name="description"
              content={`${articlePost.content11}. Xem ngay để khám phá!`}
            />
            <meta property="og:title" content={articlePost.header1} />
            <meta property="og:description" content={articlePost.content12} />
            <meta property="og:image" content={articlePost.altImage1} />
            <meta
              property="og:url"
              content={`${API_BASE_URL}/bai-viet/${slug}`}
            />
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
            />
          </Helmet>

          {/* 🔥 Breadcrumb SEO */}
          <CustomBreadcrumb hideOnNavbar={true} />

          <h1 className="mt-2 text-center mb-4">{articlePost.title}</h1>
          <p>
            <strong>Ngày đăng:</strong> {articlePost.dateCreate} |{" "}
            <strong>Cập nhật gần nhất:</strong>{" "}{formattedDate}
          </p>
          <div className="mt-3">
            <h2>{articlePost.header1}</h2>
            <p>{articlePost.content11}</p>
            <p>{articlePost.content12}</p>
          </div>
          <div className="d-flex justify-content-center">
            <img
              src={articlePost.image1Url}
              alt={articlePost.altImage1}
              className="img-fluid"
              loading="lazy"
            />
          </div>
          <div className="mt-4">
            <h2>{articlePost.header2}</h2>
            <p>{articlePost.content21}</p>
            <p>{articlePost.content22}</p>
          </div>
          <div className="mt-4 justify-content-center">
            <h2>{articlePost.header3}</h2>
            <p>{articlePost.content31}</p>
            <p>{articlePost.content32}</p>
          </div>
          <div className="d-flex justify-content-center">
            <img
              src={articlePost.image2Url}
              alt={articlePost.altImage2}
              className="img-fluid"
              loading="lazy"
            />
          </div>
          <div className="mt-4 justify-content-center">
            <h2>{articlePost.header4}</h2>
            <p>{articlePost.content41}</p>
            <p>{articlePost.content42}</p>
          </div>
          <CardGotInfo />
          <Row className="gx-1 gy-1 mb-4 mt-2 bg-danger py-2">
            {articles
              .filter((news) => news.dateCreate === today)
              .slice(0, 10)
              .map((news) => (
                <Col xs={12} key={news.id}>

                  <NewsCard
                    id={news.id}
                    title={news.title}
                    image={news.image1Url} // Đổi thành `image` nếu cần
                    description={formatContentForPost(news.content11)} // Đổi thành `description` nếu cần
                    slug={news.slugTitle}
                  />{" "}                  
                </Col>
              ))}
          </Row>
        </Col>
        <Col xs={12} md={12} lg={3} className="bg-light text-white text-center">
          <PopularArticles />
        </Col>
      </Row>
    </Container>
  );
}
