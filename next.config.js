/** @type {import('next').NextConfig} */
const nextConfig = {
<<<<<<< HEAD

=======
 output: process.env.NODE_ENV === "development" ? undefined : "export",
>>>>>>> 0a0cb2bb8e6cd2c75920c06657e9eddb6174c24f
  images: {
    domains: [
      "avatars.githubusercontent.com",
      "lh3.googleusercontent.com",
      "res.cloudinary.com",
    ],
  },
};

module.exports = nextConfig;
