'use client'
import React, { useState, useEffect } from 'react';
import '../styles/styles.css';

// References: StackOverflow to debug/troubleshoot, class notes, Next.js docs, React docs, W3 Schools

export default function Cocktails() {
    const [ingredientQuery, setIngredientQuery] = useState('');
    const [cocktailQuery, setCocktailQuery] = useState('');
    const [cocktails, setCocktails] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    const [cocktail, setCocktail] = useState(null);
    const [showIngredients, setShowIngredients] = useState(false);

    useEffect(() => {
        const fetchIngredients = async () => {
        const response = await fetch("https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list");
        const data = await response.json();
        setIngredients(data.drinks.map((item: { strIngredient1: string }) => item.strIngredient1));
    };
    fetchIngredients(); 
}, []);

    const handleIngredientChange = (e) => {
        setIngredientQuery(e.target.value);
    };

    const handleCocktailChange = (e) => {
        setCocktailQuery(e.target.value);
    };

    const handleSubmit = async (e, query) => {
        e.preventDefault();
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${query}`);
        const data = await response.json();
        setCocktails(data.drinks);
    };

    const handleRandomCocktail = async () => {
        const response = await fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php");
        const data = await response.json();
        setCocktail(data.drinks[0]);
    };

    const handleSearchCocktail = async () => {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktailQuery}`);
        const data = await response.json();
        setCocktail(data.drinks[0]);
        
    };

    const handleToggleIngredients = () => {
        setShowIngredients(!showIngredients);
    };

    return (
        <div>
            <h1>Karla's Cocktail Explorer</h1>
            <img src="https://static.vecteezy.com/system/resources/previews/023/797/850/non_2x/set-of-cocktails-summer-illustration-of-classical-drinks-in-different-types-of-glasses-illustration-of-summer-cocktails-banner-with-soft-and-alcohol-drinks-vector.jpg" alt="Cocktails illustration" />
            <h2>Find inspiration for your next drink!</h2>
            <ul>
                <li>Don't know where to start? Click for a random cocktail!</li>
                <li>Want to find something you know you'll like? </li>
                <li>1. Display a list of ingredients</li>
                <li>2. Search for cocktails that include that ingredient</li>
                <li>3. Search by cocktail name to find instructions on how to make it</li>
                </ul>
            {showIngredients && (
                <ul>
                    {ingredients.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                    ))}
                </ul>
            )}

            <button onClick={handleToggleIngredients}>
                {showIngredients ? 'Hide Ingredients' : 'Show Ingredients'}
            </button>

            <button onClick={handleRandomCocktail}>Random Cocktail</button>

            <form onSubmit={(e) => handleSubmit(e, ingredientQuery)}>
                <input
                    type="text"
                    placeholder="Search by Ingredient..."
                    value={ingredientQuery}
                    onChange={handleIngredientChange}
                />
                <button type="submit">Search</button>
            </form>

            {cocktails.length > 0 && (
                <ul>
                    {cocktails.map((cocktail, index) => (
                        <li key={index}>{cocktail.strDrink}</li>
                    ))}
                </ul>
            )}

            <input
                type="text"
                placeholder="Search by Cocktails for Instructions..."
                value={cocktailQuery}
                onChange={handleCocktailChange}
            />

            <button onClick={handleSearchCocktail}>Search</button>

            {cocktail && (
                <div>
                    <h2>{cocktail.strDrink}</h2>
                    <p>{cocktail.strInstructions}</p>
                </div>
            )}
        </div>
    );
}
