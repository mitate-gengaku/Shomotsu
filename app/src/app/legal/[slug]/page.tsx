import { legalSlug } from "@/config/legal/slug"

const Page = async ({
  params,
}: {
  params: Promise<{ slug: string }>
}) => {
  const { slug } = await params
  const { default: Legal } = await import(`@/content/${slug}.mdx`) as  { default: React.ComponentType }
 
  return <Legal />
}
 
export const generateStaticParams = () => legalSlug;
 
export const dynamicParams = false