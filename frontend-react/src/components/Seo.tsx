import { Helmet } from "react-helmet-async";

interface SeoProps {
  title: string;
  description: string;
  image: string;
  url: string;
  date: string;
}

export default function Seo({ title, description, image, url, date }: SeoProps) {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "image": image,
    "author": {
      "@type": "Person",
      "name": "Your Name"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Your Website",
      "logo": {
        "@type": "ImageObject",
        "url": "https://yourwebsite.com/logo.png"
      }
    },
    "datePublished": date,
    "mainEntityOfPage": url,
  };

  return (
    <Helmet>
      {/* Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index, follow" />

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="article" />

      {/* JSON-LD Schema Markup */}
      <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
    </Helmet>
  );
}