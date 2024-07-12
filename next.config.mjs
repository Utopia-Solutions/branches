/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    config.module.rules.push(
      {
        test: /\.md$/,
        use: "null-loader",
      },
      {
        test: /\.sql$/,
        use: "null-loader",
      }
    );
    return config;
  },
  env: {
    POSTGRES_URL: process.env.POSTGRES_URL,
  },
};

export default nextConfig;
