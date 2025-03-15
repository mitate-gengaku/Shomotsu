import type { NextConfig } from "next";
import createMDX from '@next/mdx'
import remarkGfm from 'remark-gfm'

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  experimental: {
    scrollRestoration: true,
  },
};


const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm]
  }
})

export default withMDX(nextConfig);