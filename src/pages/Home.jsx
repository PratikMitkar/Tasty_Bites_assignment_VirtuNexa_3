import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Star, Clock, Users } from "lucide-react";

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
  // Add more recipes here if needed
];

function Home() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    // Check if there are any recipes in localStorage
    let storedRecipes = JSON.parse(localStorage.getItem("recipes"));

    // If no recipes exist, add the dummy data to localStorage
    if (!storedRecipes || storedRecipes.length === 0) {
      storedRecipes = dummyData;
      localStorage.setItem("recipes", JSON.stringify(storedRecipes)); // Save dummy data to localStorage
    }

    // Set state with the recipes (either from localStorage or dummy data)
    setRecipes(storedRecipes);
  }, []);

  return (
    <div className="space-y-10 bg-primary-50 min-h-screen py-8">
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-primary-300">Welcome to Tasty Bites</h1>
        <p className="text-xl text-primary-200 max-w-2xl mx-auto">
          Discover, share, and enjoy delicious recipes from around the world.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-center text-primary-300">Featured Recipes</h2>
        {recipes.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {recipes.map((recipe) => (
              <div
                key={recipe.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                <img
                  src={recipe.image || "/placeholder.svg"}
                  alt={recipe.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2 text-primary-300">{recipe.title}</h3>
                  <p className="text-primary-200 mb-2">{recipe.category}</p>
                  <div className="flex justify-between items-center text-sm text-primary-200">
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {recipe.prepTime}
                    </span>
                    <span className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {recipe.servings} servings
                    </span>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <div className="flex items-center">
                      <Star className="w-5 h-5 text-primary-100 fill-primary-100 mr-1" />
                      <span className="font-semibold text-primary-300">
                        {recipe.rating ? recipe.rating.toFixed(1) : "N/A"}
                      </span>
                    </div>
                    <Link
                      to={`/Tasty_Bites_assignment_VirtuNexa_3/recipe/${recipe.id}`}
                      className="bg-primary-100 text-primary-300 px-4 py-2 rounded-md hover:bg-primary-200 transition-colors"
                    >
                      View Recipe
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No recipes found. Add some recipes!</p>
        )}
      </section>

      <section className="text-center space-y-4 py-8">
        <h2 className="text-3xl font-bold text-primary-300">Ready to share your culinary masterpiece?</h2>
        <Link
          to="/upload"
          className="inline-block bg-primary-100 text-primary-300 px-6 py-3 rounded-md text-lg hover:bg-primary-200 transition-colors shadow-md hover:shadow-lg"
        >
          Upload Your Recipe
        </Link>
      </section>
    </div>
  );
}

export default Home;
