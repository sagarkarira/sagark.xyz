module.exports = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/new',
        destination: '/microblog/new',
        permanent: false,
      },
    ];
  },
};
