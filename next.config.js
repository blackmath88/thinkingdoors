/** @type {import('next').NextConfig} */
const nextConfig = {
  // Transpile Three.js & react-three packages for Next.js bundler
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],
}

module.exports = nextConfig
