/** @type {import('next').NextConfig} */

const nextConfig = {
  pageExtensions: ["mdx", "md", "jsx", "js", "tsx", "ts", "glb", "mp3"],
  transpilePackages: [
    "three",
    "@react-three/fiber",
    "@react-spring/three",
    "@react-three/drei",
  ],
  env: {},
};

module.exports = nextConfig;
