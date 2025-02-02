import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import RecipeDetail from "./pages/RecipeDetail"
import UploadRecipe from "./pages/UploadRecipe"
import Search from "./pages/Search"

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/Tasty_Bites_assignment_VirtuNexa_3/" element={<Home />} />
            <Route path="/Tasty_Bites_assignment_VirtuNexa_3/recipe/:id" element={<RecipeDetail />} />
            <Route path="/Tasty_Bites_assignment_VirtuNexa_3/upload" element={<UploadRecipe />} />
            <Route path="/Tasty_Bites_assignment_VirtuNexa_3/search" element={<Search />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App

