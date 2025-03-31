import { useParams, Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { CustomBreadcrumb } from "../../layout/CustomBreadcrumb";
import { CardGotInfo } from "../../components/CardGotInfo";
import { TableOfContents } from "../../components/TableOfContents";
import { PopularArticles } from '../../components/PopularArticles';
import { useEffect } from "react";
import { useArticleBySlugWithFallback } from "../../hook/useArticleBySlugWithFallback";

export function PostDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { article: articlePost, loading, notFound } = useArticleBySlugWithFallback(slug!);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [slug]);

  const fifteenDaysAgo = new Date();
  fifteenDaysAgo.setDate(fifteenDaysAgo.getDate() - 15);
  const formattedDate = fifteenDaysAgo.toLocaleDateString("vi-VN");

  const WEB_BASE_URL = import.meta.env.VITE_SOLARTP;

  if (loading) {
    return <Container><p>Đang tải bài viết...</p></Container>;
  }

  if (notFound || !articlePost) {
    return (
      <Container>
        <h2>Bài viết không tồn tại!</h2>
        <p>Xin lỗi, chúng tôi không tìm thấy nội dung bạn đang tìm kiếm.</p>
        <Link to="/">Quay lại trang chủ</Link>
      </Container>
    );
  }

  const lastModified = new Date().toISOString();

  return (
    <Container className="post-container mx-auto" style={{ maxWidth: "100vw", padding: 0 }}>
      <Row className="gx-0 gy-0 p-0">
        <Col xs={12} md={3} lg={3} className="bg-light text-white text-center d-none d-lg-block">
          <TableOfContents />
        </Col>

        <Col xs={12} md={12} lg={6} className="bg-light p-3">
          <Helmet>
            <title>{articlePost.title} | Solar TP</title>
            <meta name="description" content={`${articlePost.content11}. Xem ngay để khám phá!`} />
            <link rel="canonical" href={`${WEB_BASE_URL}/bai-viet/${slug}`} />

            <meta property="og:type" content="article" />
            <meta property="og:title" content={articlePost.title} />
            <meta property="og:description" content={articlePost.content12} />
            <meta property="og:image" content={articlePost.image1Url} />
            <meta property="og:url" content={`${WEB_BASE_URL}/bai-viet/${slug}`} />
            <meta property="og:site_name" content="Solar TP" />

            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "BlogPosting",
                  headline: articlePost.title,
                  image: [articlePost.image1Url],
                  datePublished: articlePost.dateCreate,
                  dateModified: lastModified,
                  author: {
                    "@type": "Person",
                    name: "Tác giả Solar TP"
                  },
                  publisher: {
                    "@type": "Organization",
                    name: "Solar TP",
                    logo: {
                      "@type": "ImageObject",
                      url: "https://pub-3df5bcdfa28f404faf4edd278e17bbf5.r2.dev/logo_tpsolar.webp"
                    }
                  },
                  mainEntityOfPage: {
                    "@type": "WebPage",
                    "@id": `${WEB_BASE_URL}/bai-viet/${slug}`
                  }
                })
              }}
            />

            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "BreadcrumbList",
                  itemListElement: [
                    {
                      "@type": "ListItem",
                      position: 1,
                      name: "Trang chủ",
                      item: `${WEB_BASE_URL}`
                    },
                    {
                      "@type": "ListItem",
                      position: 2,
                      name: "Bài viết",
                      item: `${WEB_BASE_URL}/bai-viet`
                    },
                    {
                      "@type": "ListItem",
                      position: 3,
                      name: articlePost.title,
                      item: `${WEB_BASE_URL}/bai-viet/${slug}`
                    }
                  ]
                })
              }}
            />
          </Helmet>

          <CustomBreadcrumb hideOnNavbar={true} />
          <h1 className="mt-2 text-center mb-4">{articlePost.title}</h1>
          <p><strong>Ngày đăng:</strong> {articlePost.dateCreate} | <strong>Cập nhật gần nhất:</strong> {formattedDate}</p>

          <div className="mt-3">
            <h2>{articlePost.header1}</h2>
            <p>{articlePost.content11}</p>
            <p>{articlePost.content12}</p>
          </div>
          <div className="d-flex justify-content-center">
            <img src={articlePost.image1Url} alt={articlePost.altImage1} className="img-fluid" loading="lazy" />
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
            <img src={articlePost.image2Url} alt={articlePost.altImage2} className="img-fluid" loading="lazy" />
          </div>

          <div className="mt-4 justify-content-center">
            <h2>{articlePost.header4}</h2>
            <p>{articlePost.content41}</p>
            <p>{articlePost.content42}</p>
          </div>

          <CardGotInfo />

          <Row className="gx-1 gy-1 mb-4 mt-2 bg-danger py-2">
            {/* 👇 Bạn có thể thêm filter nếu cần */}
          </Row>
        </Col>

        <Col xs={12} md={12} lg={3} className="bg-light text-white text-center">
          <PopularArticles articles={[]} />
        </Col>
      </Row>
    </Container>
  );
}