import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Dummy data to populate the localStorage initially
const dummyData = [
    {
        id: 1,
        title: "Spaghetti Carbonara",
        category: "Italian",
        rating: 4.5,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvYo_Y1StmEylJbFR_gXGTQxXskdW_5QbcTA&s",
        prepTime: "30 min",
        servings: 4,
      },
      {
        id: 2,
        title: "Chicken Tikka Masala",
        category: "Indian",
        rating: 4.8,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjzkIh8APqg_KO7G1NorXh90rNC7Og22iNcw&s",
        prepTime: "45 min",
        servings: 6,
      },
      {
        id: 3,
        title: "Caesar Salad",
        category: "Salads",
        rating: 4.2,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEZ2jw-Rh2d00TfAig4TTY5qkM9wtb9byg8g&s",
        prepTime: "15 min",
        servings: 2,
      },
    ];

function Search() {
  const [searchTerm, setSearchTerm] = useState(""); // State for the search input
  const [searchResults, setSearchResults] = useState([]); // State for filtered search results
  const [allRecipes, setAllRecipes] = useState([]); // State for all recipes

  // Fetch recipes from localStorage when the component mounts
  useEffect(() => {
    // Check if there are any recipes in localStorage
    let storedRecipes = JSON.parse(localStorage.getItem("recipes"));

    // If no recipes exist, add the dummy data to localStorage
    if (!storedRecipes || storedRecipes.length === 0) {
      storedRecipes = dummyData;
      localStorage.setItem("recipes", JSON.stringify(storedRecipes)); // Save dummy data to localStorage
    }

    // Set state with the recipes (either from localStorage or dummy data)
    setAllRecipes(storedRecipes);
    setSearchResults(storedRecipes); // Set the initial state with all recipes
  }, []);

  // Handle search logic
  const handleSearch = (e) => {
    e.preventDefault();

    // Filter recipes based on search term in title or category
    const results = allRecipes.filter(
      (recipe) =>
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setSearchResults(results); // Update the search results
  };

  // Clear search input and show all recipes when the input is empty
  useEffect(() => {
    if (searchTerm === "") {
      setSearchResults(allRecipes);
    }
  }, [searchTerm, allRecipes]);

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-center my-8">Search Recipes</h2>

      {/* Search Input Form */}
      <form onSubmit={handleSearch} className="flex gap-2">
        <input
          type="text"
          placeholder="Search by title or category"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Update search term
          className="flex-grow p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        />
        <button
          type="submit"
          className="bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 transition-colors"
        >
          Search
        </button>
      </form>

      {/* Display Search Results */}
      {searchResults.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {searchResults.map((recipe) => (
            <div
              key={recipe.id}
              className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105"
            >
              <img
                src={recipe.image || "/placeholder.svg"}
                alt={recipe.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{recipe.title}</h3>
                <p className="text-gray-600 mb-2">{recipe.category}</p>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>{recipe.prepTime}</span>
                  <span>{recipe.servings} servings</span>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <div className="flex items-center">
                    {/* Rating with a fallback if undefined */}
                    <svg className="w-5 h-5 text-yellow-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="font-semibold">
                      {recipe.rating ? recipe.rating.toFixed(1) : "N/A"}
                    </span>
                  </div>
                  <Link
                    to={`/recipe/${recipe.id}`}
                    className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors"
                  >
                    View Recipe
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No recipes found. Try a different search.</p>
      )}
    </div>
  );
}

export default Search;
