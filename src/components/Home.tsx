import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import { db } from '../firebase';
import { useNavigate } from 'react-router-dom';

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
      <button onClick={logout}>logout</button>
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
