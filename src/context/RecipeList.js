import { useState, useEffect } from "react";

function RecipeList() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const storedRecipes = JSON.parse(localStorage.getItem("recipes")) || [];
    setRecipes(storedRecipes);
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-10">
      <h2 className="text-3xl font-bold text-center mb-6 text-primary-300">All Recipes</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {recipes.length > 0 ? (
          recipes.map((recipe, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-md">
              <img src={recipe.image || "/placeholder.svg"} alt={recipe.title} className="w-full h-40 object-cover rounded-md" />
              <h3 className="text-xl font-semibold mt-2">{recipe.title}</h3>
              <p className="text-sm text-gray-500">{recipe.category}</p>
              <p className="mt-2 text-sm"><strong>Prep Time:</strong> {recipe.prepTime}</p>
              <p className="text-sm"><strong>Servings:</strong> {recipe.servings}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No recipes found. Add some recipes!</p>
        )}
      </div>
    </div>
  );
}

export default RecipeList;
