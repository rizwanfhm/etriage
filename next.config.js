/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.ctfassets.net'],
  },

  webpack: (config, { dev, isServer }) => {
    if (dev) {
      config.devtool = 'eval-source-map'
    }
    return config
  },
}

module.exports = nextConfig
