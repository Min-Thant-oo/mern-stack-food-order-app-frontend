import Footer from "@/components/Layout/Footer";
import Header from "@/components/Layout/Header";
import Hero from "@/components/Layout/Hero";

type Props = {
    children: React.ReactNode;
    showHero?: boolean;
}
const Layout = ({ children, showHero = false }: Props) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {showHero && <Hero />}
      <div className="container mx-auto flex-1 py-10 px-4 md:px-0">{children}</div>
      <Footer />
    </div>
  )
}

export default Layout