//import React from 'react'
import { Search } from "lucide-react";
import RecipeCard from "../components/RecipeCard";
import { useEffect, useState } from "react";

const APP_ID = null;
const APP_KEY = "1"

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRecipes = async (searchQuery) => {
    setLoading(true);
    setRecipes([]);
    try {
      const res = await fetch(`https://www.themealdb.com/api/json/v1/${APP_KEY}/search.php?s=${searchQuery}`);
      const data = await res.json();
      setRecipes(data.meals)
    } catch (error) {
      console.log(error.message)
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchRecipes("chicken");
  }, []);


  return (
    <div className="bg-[#faf9fb] p-10 flex-1">
      <div className="max-w-screen-lg mx-auto">
        <form>
          <label className="input shadow-md flex items-center gap-2">
            <Search size={"24"} />
            <input type="text" 
            className="text-sm md:textarea-md grow"
            placeholder="Imma let u cook g"
            />
          </label>
        </form>

        <h1 className="font-bold text-3xl md:text-5xl mt-4">
          Recommended Recipes
        </h1>

        <p className="text-slate-500 font-semibold ml-1 my-2 text-sm tracking-tight">
          Popular choices
        </p>

        {/* cards */}
        <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">         
          {/* TEMPORARY - populate homepage with recipes */}
          <RecipeCard />
          <RecipeCard />
          <RecipeCard />
          <RecipeCard />
          <RecipeCard />
          <RecipeCard />
          <RecipeCard />
          <RecipeCard />
          <RecipeCard />
          <RecipeCard />
          <RecipeCard />
          <RecipeCard />
        </div>

      </div>
    </div>
  );
};

export default HomePage;