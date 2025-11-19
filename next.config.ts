const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    // Optionally add remark and rehype plugins here
    // See https://mdxjs.com/docs/getting-started/#installation
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  // Your other Next.js configurations
};

module.exports = withMDX(nextConfig);
