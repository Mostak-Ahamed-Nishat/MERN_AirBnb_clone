/** @type {import('next').NextConfig} */
const nextConfig = {
 output: process.env.NODE_ENV === "development" ? undefined : "export",
  images: {
    domains: [
      "avatars.githubusercontent.com",
      "lh3.googleusercontent.com",
      "res.cloudinary.com",
    ],
  },
};

module.exports = nextConfig;
