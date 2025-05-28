/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    // Handle .mjs files for dependencies like framer-motion
    config.module.rules.push({
      test: /\.mjs$/,
      include: /node_modules/,
      type: 'javascript/auto',
    });

    // Fallback for Node.js modules
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        process: false,
        path: false,
      };
    }

    // Define path aliases
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': require('path').resolve(__dirname, 'src'),
    };

    return config;
  },
};

module.exports = nextConfig;