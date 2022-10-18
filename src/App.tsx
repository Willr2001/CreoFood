import React, { useState } from 'react';
import './App.css';

function App() {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [input, setInput] = useState<string>('');

  const fetchRecipes = () => {
    const url = `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?ingredients=${ingredients.join(
      ','
    )}`;

    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '261e394999msh8fb6322d521a783p1b272ejsned003eaab8aa',
        'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
      },
    };
    fetch(url, options)
      .then((res) => res.json())
      .then((json) => console.log(json))
      .catch((err) => console.error('error:' + err));
  };

  return (
    <div>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button
        onClick={() => {
          setIngredients((oldIngredients) => [...oldIngredients, input]);
          setInput('');
        }}
      >
        Add ingredient
      </button>
      {ingredients}
      <button onClick={fetchRecipes}>Get recipes</button>
    </div>
  );
}

export default App;
