import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// Dummy data to populate if no recipe is found
const dummyData = [
  {
    id: 1,
    title: "Spaghetti Carbonara",
    category: "Italian",
    rating: 4.5,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvYo_Y1StmEylJbFR_gXGTQxXskdW_5QbcTA&s",
    prepTime: "30 min",
    servings: 4,
    ingredients: "Spaghetti, Eggs, Parmesan, Bacon, Pepper, Salt",
    instructions: "Boil the spaghetti. Cook the bacon. Mix eggs and cheese. Combine all ingredients.",
    comments: [],
  },
  {
    id: 2,
    title: "Chicken Tikka Masala",
    category: "Indian",
    rating: 4.8,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjzkIh8APqg_KO7G1NorXh90rNC7Og22iNcw&s",
    prepTime: "45 min",
    servings: 6,
    ingredients: "Chicken, Yogurt, Tomato, Spices, Garlic, Ginger",
    instructions: "Marinate the chicken. Cook the spices. Add tomato and chicken. Simmer until done.",
    comments: [],
  },
  {
    id: 3,
    title: "Caesar Salad",
    category: "Salads",
    rating: 4.2,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEZ2jw-Rh2d00TfAig4TTY5qkM9wtb9byg8g&s",
    prepTime: "15 min",
    servings: 2,
    ingredients: "Lettuce, Caesar dressing, Croutons, Parmesan",
    instructions: "Toss lettuce with dressing. Add croutons and cheese.",
    comments: [],
  },
  // Add more dummy recipes as needed
];

function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [commentRating, setCommentRating] = useState(0);

  useEffect(() => {
    // Get recipes from localStorage
    const storedRecipes = JSON.parse(localStorage.getItem("recipes")) || dummyData; // Use dummyData if nothing in localStorage
    const selectedRecipe = storedRecipes.find((r) => r.id === parseInt(id, 10));

    if (selectedRecipe) {
      setRecipe(selectedRecipe);
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    const newComment = { 
      id: Date.now(), 
      user: "Guest", 
      text: comment, 
      rating: commentRating 
    };

    const updatedRecipe = { 
      ...recipe, 
      comments: [...(recipe.comments || []), newComment] 
    };

    // Update localStorage
    const storedRecipes = JSON.parse(localStorage.getItem("recipes")) || dummyData;
    const updatedRecipes = storedRecipes.map((r) => (r.id === recipe.id ? updatedRecipe : r));
    localStorage.setItem("recipes", JSON.stringify(updatedRecipes));

    // Update state
    setRecipe(updatedRecipe);
    setComment("");
    setRating(0);
    setCommentRating(0);
  };

  if (!recipe) {
    return <p className="text-center text-gray-500">Recipe not found.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <img
        src={recipe.image || "/placeholder.svg"}
        alt={recipe.title}
        className="w-full h-64 object-cover rounded-lg mb-6 shadow-md"
      />
      <h2 className="text-3xl font-bold mb-4 text-orange-500">{recipe.title}</h2>
      <div className="flex items-center mb-6 text-gray-600">
        <span className="mr-4">{recipe.prepTime}</span>
        <span className="mr-4">{recipe.servings} servings</span>
        <span>{recipe.category}</span>
      </div>
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div className="bg-gray-100 p-6 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold mb-4">Ingredients:</h3>
          <ul className="list-disc list-inside space-y-2">
            {recipe.ingredients?.split(", ").map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>
        <div className="bg-gray-100 p-6 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold mb-4">Instructions:</h3>
          <ol className="list-decimal list-inside space-y-2">
            {recipe.instructions?.split(". ").map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </div>
      </div>

      <h3 className="text-2xl font-bold mb-4">Comments</h3>
      {recipe.comments?.length ? (
        recipe.comments.map((comment) => (
          <div key={comment.id} className="mb-4 p-4 bg-gray-100 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold">{comment.user}</span>
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className={star <= comment.rating ? "text-yellow-500" : "text-gray-300"}>
                    ⭐
                  </span>
                ))}
              </div>
            </div>
            <p>{comment.text}</p>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No comments yet.</p>
      )}

      <form onSubmit={handleSubmit} className="mt-8 space-y-4 bg-gray-100 p-6 rounded-lg shadow-sm">
        <h4 className="text-xl font-semibold">Add a Comment</h4>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Your comment"
          required
          className="w-full p-2 border border-gray-300 rounded-md"
        ></textarea>
        <div>
          <span className="mr-2">Rating:</span>
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              className={`mr-1 ${star <= commentRating ? "text-yellow-500" : "text-gray-300"}`}
              onClick={() => setCommentRating(star)}
            >
              ⭐
            </button>
          ))}
        </div>
        <button type="submit" className="bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600">
          Submit Comment
        </button>
      </form>
    </div>
  );
}

export default RecipeDetail;
