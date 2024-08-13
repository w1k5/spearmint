/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
    assetPrefix: isProd ? '/spearmint/' : '',
    basePath: isProd ? '/spearmint' : '',
    output: 'export', // Outputs a Single-Page Application (SPA).
    distDir: './build', // Changes the build output directory to `./dist/`.
}

export default nextConfig