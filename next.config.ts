import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    domains: [ 
      "cdn.pixabay.com",
      "images.unsplash.com",
      "picsum.photos",
      "placekitten.com",
      "res.cloudinary.com",
      "source.unsplash.com",
    ], 
  },
}

export default nextConfig