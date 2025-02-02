import { Instagram, Twitter, Facebook } from "lucide-react"

function Footer() {
  return (
    <footer className="bg-primary-100 text-primary-300">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-semibold mb-2">Connect with us</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-primary-200 transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-primary-200 transition-colors">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-primary-200 transition-colors">
                <Facebook className="w-6 h-6" />
              </a>
            </div>
          </div>
          <div className="text-center md:text-right">
            <p className="text-primary-300">&copy; 2023 Tasty Bites. All rights reserved.</p>
            <p className="text-primary-200 text-sm mt-1">Delicious recipes at your fingertips</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

