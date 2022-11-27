import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import { db } from '../firebase';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = (props: { setFavorites: Dispatch<SetStateAction<any>> }) => {
  const { currentUser, login, signup, loginWithGoogle, logout } = useAuth();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [input, setInput] = useState<string>('');
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [results, setResults] = useState<any[]>([]);

  const navigate = useNavigate();

  const fetchRecipes = () => {
    const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients.join(
      ','
    )}&apiKey=ec68f3677ed5443288d50ba50601c5e5`;

    fetch(url)
      .then((res) => res.json())
      .then(setResults)
      .catch((err) => console.error('error:' + err));
    setIngredients([]);
  };

  const addFavorite = async (recipe: any) => {
    if (currentUser) {
      const userRef = doc(db, 'users', currentUser.uid);
      await updateDoc(userRef, { favoriteRecipes: arrayUnion(recipe) });
      props.setFavorites((oldFavorites: any) => [...oldFavorites, recipe]);
    }
  };

  return currentUser ? (
    <div>
      <header>
        <img src="..\icons\recipeIcon.jpg" alt="receipeIcon"></img>
        <h1>CreoFood</h1>
      </header>

      <div className="nav">
        <a href="#section1" className="btn">
          Meat
        </a>
        <a href="#section2" className="btn">
          Veggies
        </a>
        <a href="#section3" className="btn">
          Oils
        </a>
        <a href="#section4" className="btn">
          Fish
        </a>
      </div>
      <div className="section one" id="section1">
        Meats<br></br>
        <select name="meats" id="meats" multiple>
          <option value="chicekn">Chicken</option>
          <option value="lamb">Lamb</option>
          <option value="beef">Beef</option>
          <option value="bacon">Bacon</option>
          <option value="pepperoni">pepperoni</option>
        </select>
      </div>
      <div className="section two" id="section2">
        Veggies<br></br>
        <select name="veggies" id="veggies" multiple>
          <option value="broccoli">Broccoli</option>
          <option value="arugula">Arugula</option>
          <option value="carrots">Carrorts</option>
          <option value="celery">Celery</option>
          <option value="dill">Dill</option>
        </select>
      </div>
      <div className="section three" id="section3">
        Oils<br></br>
        <select name="oils" id="oils" multiple>
          <option value="canoloa">canoloa</option>
          <option value="vegetable">vegetable</option>
          <option value="olive">olive</option>
          <option value="avacado">avacado</option>
        </select>
      </div>
      <div className="section four" id="section4">
        Fish<br></br>
        <select name="Fish" id="Fish" multiple>
          <option value="salmon">Salmon</option>
          <option value="cod">Cod</option>
          <option value="lobster">Lobster</option>
          <option value="crab">Crab</option>
        </select>
      </div>

      <div className="sidenav">
        <button id="logout-button" role="button" onClick={logout}>
          logout
        </button>
        <a href="#about">About</a>
        <a href="#Favourites">Favourite Recipes</a>
      </div>

      <button onClick={() => navigate('/favorites')}>favorites</button>
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
      {results.map((result) => (
        <div key={result.title}>
          <h2>{result.title}</h2>
          <img src={result.image} alt={result.title} />
          <button
            onClick={() =>
              addFavorite(result)
                .then(() => alert('favorited!'))
                .catch(console.log)
            }
          >
            favorite
          </button>
        </div>
      ))}
    </div>
  ) : (
    <>
      <input placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={() => login(email, password)}>sign in</button>
      <button onClick={loginWithGoogle}>sign in with google</button>
      <button onClick={() => signup(email, password)}>sign up</button>
    </>
  );
};

export default Home;
