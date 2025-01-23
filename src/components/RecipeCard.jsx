import { BookOpenText, Heart, HeartPulse, Soup, SquarePlay, Youtube } from 'lucide-react'
import { useEffect, useState } from 'react'
//import React from 'react'


const RecipeCard = ({meal}) => {

    // modal function for written instructions
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    // function to render ingredients from API, formatting to ingredient - measurement
    // ingredients are in separate json objects, hence the need for this function
    const renderIngredients = () => {
        const ingredients = [];
        for (let i = 1; i <= 20; i++) {
            const ingredient = meal[`strIngredient${i}`];
            const measure = meal[`strMeasure${i}`];
            if (!ingredient || ingredient.trim() === '') {
                break;
            }
            ingredients.push(`${ingredient} - ${measure || ''}`)
        }
        return ingredients;
    };

    const [isFavourite, setIsFavourite] = useState(localStorage.getItem('favourites')?.includes(meal.strMeal));

    const addRecipeToFavourites = () => {
        let favourites = JSON.parse(localStorage.getItem('favourites')) || [];
        const isRecipeAlreadyInFavourites = favourites.some((fav) => fav.strMeal === meal.strMeal);

        if(isRecipeAlreadyInFavourites) {
            favourites = favourites.filter((fav) => fav.strMeal !== meal.strMeal);
            setIsFavourite(false);
        } else {
            favourites.push(meal)
            setIsFavourite(true);
        }

        localStorage.setItem("favourites", JSON.stringify(favourites));
    }

    // prevent scrolling while modal is open
    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        // cleanup to reset overflow when component unmounts
        return () => {
            document.body.style.overflow = '';
        };
    }, [isModalOpen]);


    return (
        <div className="flex flex-col rounded-md bg-[#ecf7d4] overflow-hidden p-3 relative">
            {/* anchor - ensures entire thing (image) clickable to link; preview pic */}
            <a href={meal.strYoutube} target="_blank" className="relative h-32">
                {/* inside anchor, image then div over image in absolute position */}

                {/* image optimisation - skeleton while loading */}
                <div className="skeleton absolute inset-0"/>    
                <img 
                    src={meal.strMealThumb} 
                    alt="recipe img"
                    className="rounded-md w-full h-full object-cover cursor-pointer opacity-0 transition-opacity duration-500"
                    onLoad={(e) => {
                        e.currentTarget.style.opacity = 1;
                        e.currentTarget.previousElementSibling.style.display = "none";
                    }}
                />

                {/* servings div */}
                <div className="absolute bottom-2 left-2 bg-white rounded-full p-1 cursor-pointer flex
                items-center gap-1 text-sm">
                <Soup size={"16"} /> {meal.strCategory}
                </div>

                {/* favourites button div */}
                <div className="absolute top-1 right-2 bg-white rounded-full p-1 cursor-pointer" 
                    onClick={(e) => {
                        e.preventDefault();
                        addRecipeToFavourites();
                    } }
                >
                    {!isFavourite && <Heart size={"20"} className="hover:fill-red-500 hover:text-red-500" />}
                    {isFavourite && <Heart size={"20"} className="fill-red-500 text-red-500" />}
                </div>
            </a>

            {/* recipe text title */}
            <div className="flex mt-1">
                <p className="font-bold tracking-wide">{meal.strMeal}</p>
            </div>

            {/* cuisine */}
            <p className="my-2">{meal.strArea} Cuisine</p>

            {/* tag thingies */}
            <div className="flex gap-2 mt-auto">
                <button
                    className="bg-[#d6f497] p-2 rounded-md text-sm font-semibold tracking-tighter"
                    onClick={toggleModal}
                >
                    <span className="flex items-center justify-center gap-1">
                        <BookOpenText size={"16"}/>
                        Written Guide
                    </span>
                </button>

                {/* if meal.strTags is not null then render */}
                {meal.strYoutube && (
                    <a href={meal.strYoutube} target="_blank">
                        <div className="flex gap-1 bg-[#d6f497] items-center p-2 rounded-md">
                            <SquarePlay size={"16"} />
                            <span className="text-sm tracking-tighter font-semibold">Video Guide</span>
                        {/* <span className="text-sm tracking-tighter font-semibold">{meal.strTags}</span> */}
                        </div>
                    </a>
                    
                )}
            </div>
            {/* Modal */}
            {isModalOpen && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-md p-6 max-w-lg w-full max-h-screen overflow-y-auto">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">{meal.strMeal}</h2>
                            <button 
                            className="text-red-500 font-bold"
                            onClick={toggleModal}
                            >
                                X
                            </button>
                        </div>
                        <img 
                            src={meal.strMealThumb}
                            alt="meal img"
                            className="rounded-md w-full h-40 object-cover mb-4"
                        />
                        <h3 className="font-bold text-lg mb-2">Ingredients</h3>
                        <ul className="list-disc ml-6">
                            {renderIngredients().map((ingredient, index) => (
                                <li key={index}>{ingredient}</li>
                            ))}
                        </ul>
                        <h3 className="font-bold text-lg mt-4 mb-2">Instructions</h3>
                        <p>{meal.strInstructions}</p>
                        
                        {/* Source */}
                        {meal.strSource && (
                            <div className="mt-4">
                                <a
                                    href={meal.strSource}
                                    target="_blank"
                                    className="text-blue-500 underline"
                                >
                                    Written source (opens in new tab)
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            )}
            
        </div>
    );
};

export default RecipeCard;