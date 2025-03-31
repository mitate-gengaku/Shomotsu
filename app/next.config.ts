import type { NextConfig } from "next";
import createMDX from '@next/mdx'

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  experimental: {
    scrollRestoration: true,
    authInterrupts: true,
  },
  typescript: {
    tsconfigPath: "tsconfig.build.json"
  }
};

const withMDX = createMDX({
  //
})

export default withMDX(nextConfig);