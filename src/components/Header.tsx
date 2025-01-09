import { Link } from "react-router-dom"
import MobileNav from "./MobileNav"
import MainNav from "./MainNav"

const Header = () => {
  return (
    <div className="border-b-2 border-b-orange-500 py-6 px-4 md:px-0">
        <div className="container mx-auto flex justify-between items-center">
            <Link
                to='/' 
                className="text-3xl font-bold tracking-tight text-orange-500"
            >
              SolarEats.com
            </Link>

            <div className="md:hidden">
              <MobileNav />
            </div>

            {/* Desktop nav */}
            <div className="hidden md:block">
              <MainNav />
            </div>
        </div>
    </div>
  )
}

export default Header