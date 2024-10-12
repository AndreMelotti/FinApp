/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['placeholder.com'], // Add any other domains you're using for images
    },
    async rewrites() {
        return [
            {
                source: '/robots.txt',
                destination: '/app/robots.txt',
            },
            {
                source: '/sitemap.xml',
                destination: '/app/sitemap.xml',
            },
        ];
  },
};

export default nextConfig;
