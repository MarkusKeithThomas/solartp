// generate-sitemap.ts
import axios from 'axios';
import fs from 'fs';
import path from 'path';

const API_URL = 'https://api.solartp.com.vn/bai-viet/list?lastId=0&limit=1000';
const SITE_URL = 'https://solartp.com.vn';

const generateSitemap = async () => {
  try {
    const res = await axios.get(API_URL);
    const articles = res.data.articles || [];

    const urls = articles.map((article: any) => {
      const slug = article.slugTitle;
      const lastmod = new Date(article.dateCreate).toISOString();
      return `
  <url>
    <loc>${SITE_URL}/bai-viet/${slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
    });

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset 
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;

    const outputPath = path.join('public', 'sitemap.xml');
    fs.writeFileSync(outputPath, xml);
    console.log(`✅ sitemap.xml created with ${articles.length} URLs`);
  } catch (error) {
    console.error('❌ Failed to generate sitemap:', error.message);
  }
};

generateSitemap();