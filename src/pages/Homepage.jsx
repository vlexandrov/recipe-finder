//import React from 'react'
import { Search } from "lucide-react";

const HomePage = () => {
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
        </div>

      </div>
    </div>
  );
};

export default HomePage;