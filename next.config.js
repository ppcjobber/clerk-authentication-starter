/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/how-it-works',
        destination: '/method',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
