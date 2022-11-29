import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import { db } from '../firebase';
import './Home.css';
import SideNav from './SideNav';
import Dialog from '@mui/material/Dialog';

const Home = (props: { setFavorites: Dispatch<SetStateAction<any>> }) => {
  const { currentUser, login, signup, loginWithGoogle } = useAuth();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [input, setInput] = useState<string>('');
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [results, setResults] = useState<any[]>([]);
  const [steps, setSteps] = useState<any>();
  const [recipeDetailsPopupOpen, setRecipeDetailsPopupOpen] = useState<boolean>(false);

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

  const fetchSteps = (id: string) => {
    const url = `https://api.spoonacular.com/recipes/${id}/analyzedInstructions?apiKey=ec68f3677ed5443288d50ba50601c5e5`;
    fetch(url)
      .then((res) => res.json())
      .then(setSteps);
  };

  const addFavorite = async (recipe: any) => {
    if (currentUser) {
      const userRef = doc(db, 'users', currentUser.uid);
      await updateDoc(userRef, { favoriteRecipes: arrayUnion(recipe) });
      props.setFavorites((oldFavorites: any) => [...oldFavorites, recipe]);
    }
  };

  console.log(steps);

  return currentUser ? (
    <div>
      <header>
        <img src="..\icons\recipeIcon.png" alt="receipeIcon"></img>
        <h1>CreoFood</h1>
      </header>
      <SideNav />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <input value={input} onChange={(e) => setInput(e.target.value)} />
        <button
          onClick={() => {
            setIngredients((oldIngredients) => [...oldIngredients, input]);
            setInput('');
          }}
        >
          Add ingredient
        </button>
        <button onClick={fetchRecipes}>Get recipes</button>
        {ingredients.map((ingredient) => {
          return <h1 key={ingredient}>{ingredient}</h1>;
        })}
        <div />
      </div>
      {results.map((result) => (
        <div
          key={result.title}
          style={{ cursor: 'pointer' }}
          onClick={() => {
            fetchSteps(result.id);
            setRecipeDetailsPopupOpen(true);
          }}
        >
          <h2>{result.title}</h2>
          <img src={result.image} alt={result.title} />
          <button
            onClick={() => {
              addFavorite(result)
                .then(() => alert('favorited!'))
                .catch(console.log);
            }}
          >
            favorite
          </button>
        </div>
      ))}
      <Dialog
        open={recipeDetailsPopupOpen}
        onClose={() => {
          setRecipeDetailsPopupOpen(false);
          setSteps('');
        }}
      >
        {steps &&
          steps[0].steps.map((step: { number: string; step: string }) => {
            return (
              <div key={step.number}>
                <h1>{step.number}</h1>
                <p>{step.step}</p>
              </div>
            );
          })}
      </Dialog>
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
