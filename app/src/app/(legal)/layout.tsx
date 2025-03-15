import { Footer } from "@/components/layout/footer"
import { Header } from "@/components/layout/header"

const LegalLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <>
      <Header />
      <main className="pt-[calc(4rem+60px)] pb-16 px-4">
        <div className="prose prose-sm md:prose-base max-w-[1280px] w-full lg:w-1/2 mx-auto">
          {children}
        </div>
      </main>
      <Footer />
    </>
  )
}

export default LegalLayout