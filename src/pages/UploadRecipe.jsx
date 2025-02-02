import { useState, useEffect } from "react";
import { Camera } from "lucide-react";

function UploadRecipe() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [prepTime, setPrepTime] = useState("");
  const [servings, setServings] = useState("");
  const [image, setImage] = useState(null);
  const [recipes, setRecipes] = useState([]);

  // Load recipes from localStorage when the component mounts
  useEffect(() => {
    const storedRecipes = JSON.parse(localStorage.getItem("recipes")) || [];
    setRecipes(storedRecipes);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRecipe = { title, category, ingredients, instructions, prepTime, servings, image };

    const updatedRecipes = [...recipes, newRecipe];
    setRecipes(updatedRecipes);

    // Save to localStorage
    localStorage.setItem("recipes", JSON.stringify(updatedRecipes));

    // Reset the form
    setTitle("");
    setCategory("");
    setIngredients("");
    setInstructions("");
    setPrepTime("");
    setServings("");
    setImage(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-primary-50 p-6 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center text-primary-300">Share Your Recipe</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Image Upload Section */}
        <div className="flex justify-center mb-4">
          <div className="relative w-40 h-40 bg-primary-100 rounded-full overflow-hidden">
            {image ? (
              <img src={image} alt="Recipe" className="w-full h-full object-cover" />
            ) : (
              <div className="flex items-center justify-center w-full h-full text-primary-200">
                <Camera className="w-12 h-12" />
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>
        </div>

        {/* Recipe Input Fields */}
        <div className="space-y-2">
          <label className="block text-primary-300 font-medium">Recipe Title</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-2 border border-primary-200 rounded-md bg-white text-primary-300" required />
        </div>

        <div className="space-y-2">
          <label className="block text-primary-300 font-medium">Category</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full p-2 border border-primary-200 rounded-md bg-white text-primary-300" required>
            <option value="">Select a category</option>
            <option value="italian">Italian</option>
            <option value="indian">Indian</option>
            <option value="mexican">Mexican</option>
            <option value="chinese">Chinese</option>
            <option value="american">American</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-primary-300 font-medium">Preparation Time</label>
            <input type="text" value={prepTime} onChange={(e) => setPrepTime(e.target.value)} className="w-full p-2 border border-primary-200 rounded-md bg-white text-primary-300" required />
          </div>
          <div className="space-y-2">
            <label className="block text-primary-300 font-medium">Servings</label>
            <input type="number" value={servings} onChange={(e) => setServings(e.target.value)} className="w-full p-2 border border-primary-200 rounded-md bg-white text-primary-300" required />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-primary-300 font-medium">Ingredients</label>
          <textarea value={ingredients} onChange={(e) => setIngredients(e.target.value)} rows="4" className="w-full p-2 border border-primary-200 rounded-md bg-white text-primary-300" required></textarea>
        </div>

        <div className="space-y-2">
          <label className="block text-primary-300 font-medium">Instructions</label>
          <textarea value={instructions} onChange={(e) => setInstructions(e.target.value)} rows="6" className="w-full p-2 border border-primary-200 rounded-md bg-white text-primary-300" required></textarea>
        </div>

        <button type="submit" className="w-full bg-primary-100 text-primary-300 py-3 px-4 rounded-md hover:bg-primary-200 transition-colors">
          Upload Recipe
        </button>
      </form>
    </div>
  );
}

export default UploadRecipe;
