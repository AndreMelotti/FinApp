export const GET = async () => {
    const sitemap = `<?xml version="1.0" encoding="UTF-8" ?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>https://www.nuares.org/</loc>
        <changefreq>monthly</changefreq>
        <priority>1.0</priority>
      </url>
    </urlset>`;
  
    return new Response(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
      },
    });
  };
  