import Header from "@/components/Header";

type Props = {
    children: React.ReactNode;
}
const Layout = ({ children }: Props) => {
  return (
    <div className="flex flex-col min-h-screen  ">
        <Header />

        <div className="container mx-auto flex-1 py-10 px-4 md:px-0">{children}</div>
    </div>
  )
}

export default Layout