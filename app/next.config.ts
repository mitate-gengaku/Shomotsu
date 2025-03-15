import type { NextConfig } from "next";
import createMDX from '@next/mdx'

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  experimental: {
    scrollRestoration: true,
  },
};

const withMDX = createMDX({
  //
})

export default withMDX(nextConfig);