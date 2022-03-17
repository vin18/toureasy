/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    MONGO_URI:
      'mongodb+srv://vin123:vin123@cluster0.2xoin.mongodb.net/toureasy?retryWrites=true&w=majority',
  },
};

module.exports = nextConfig;
