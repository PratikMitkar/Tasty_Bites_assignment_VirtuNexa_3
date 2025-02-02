import { Link } from "react-router-dom"
import { Home, PlusCircle, Search } from "lucide-react"
import logo from '../assets/download.png'

function Header() {
  return (
    <header className="bg-primary-100 shadow-md">
      <div className="container mx-auto px-4 flex justify-between items-center py-4">
        <Link to="/" className="text-2xl font-bold flex items-center text-primary-300">
          <img
            src={logo}
            alt="Tasty Bites Logo"
            className="mr-2 rounded-full bg-primary-50 w-12"
          />
          Tasty Bites
        </Link>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link to="/" className="flex items-center text-primary-300 hover:text-primary-200 transition-colors">
                <Home className="w-5 h-5 mr-1" />
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/upload"
                className="flex items-center text-primary-300 hover:text-primary-200 transition-colors"
              >
                <PlusCircle className="w-5 h-5 mr-1" />
                Add Recipe
              </Link>
            </li>
            <li>
              <Link
                to="/search"
                className="flex items-center text-primary-300 hover:text-primary-200 transition-colors"
              >
                <Search className="w-5 h-5 mr-1" />
                Search
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header

