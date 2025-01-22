import { Heart, HeartPulse, Soup } from 'lucide-react'
//import React from 'react'

const RecipeCard = () => {
  return (
    <div className="flex flex-col rounded-md bg-[#ecf7d4] overflow-hidden p-3 relative">
        {/* anchor - ensures entire thing (image) clickable to link; preview pic */}
        <a href="#" className="relative h-32">
            {/* inside anchor, image then div over image in absolute position */}
            <img src="/1.jpg" alt="recipe img"
            className="rounded-md w-full h-full object-cover cursor-pointer"
            />

            {/* servings div */}
            <div className="absolute bottom-2 left-2 bg-white rounded-full p-1 cursor-pointer flex
            items-center gap-1 text-sm">
            <Soup size={"16"} />
            4 Servings
            </div>

            {/* favourites button div */}
            <div className="absolute top-1 right-2 bg-white rounded-full p-1 cursor-pointer">
            <Heart size={"20"} className="hover:fill-red-500 hover:text-red-500" />
            </div>
        </a>

        {/* recipe text title */}
        <div className="flex mt-1">
            <p className="font-bold tracking-wide">Roasted Chicken</p>
        </div>

        {/* cuisine */}
        <p className="my-2">Turkish Kitchen</p>

        {/* tag thingies */}
        <div className="flex gap-2 mt-auto">
            <div className="flex gap-1 bg-[#d6f497] items-center p-1 rounded-md">
                <HeartPulse size={"16"} />
                <span className="text-sm tracking-tighter font-semibold">Gluten-free</span>
            </div>
            <div className="flex gap-1 bg-[#d6f497] items-center p-1 rounded-md">
                <HeartPulse size={"16"} />
                <span className="text-sm tracking-tighter font-semibold">Heart-healthy</span>
            </div>
        </div>
    </div>
  )
}

export default RecipeCard