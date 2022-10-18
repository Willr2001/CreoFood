import { doc, getDoc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { db } from '../firebase';

const Favorites = () => {
  const { currentUser } = useAuth();
  const [favorites, setFavorites] = useState<any[]>([]);

  const navigate = useNavigate();

  const removeFavorite = async (recipeTitle: any) => {
    if (currentUser) {
      const newFavorites = favorites.filter((recipe) => recipe.title !== recipeTitle);
      const userRef = doc(db, 'users', currentUser.uid);
      await updateDoc(userRef, { favoriteRecipes: newFavorites });
      setFavorites(newFavorites);
    }
  };

  useEffect(() => {
    const fetchFavorites = async () => {
      if (currentUser) {
        const userRef = doc(db, 'users', currentUser.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          return userSnap.data().favoriteRecipes.forEach((recipe: any) => {
            setFavorites((oldFavorites) => [...oldFavorites, recipe]);
          });
        }
      }
    };
    fetchFavorites();
  }, [currentUser]);
  return favorites.length !== 0 ? (
    <>
      <button onClick={() => navigate('/')}>home</button>
      {favorites.map((favorite) => (
        <div key={favorite.title}>
          <h2>{favorite.title}</h2>
          <img src={favorite.image} alt={favorite.title} />
          <button onClick={() => removeFavorite(favorite.title)}>unfavorite</button>
        </div>
      ))}
    </>
  ) : (
    <>
      <button onClick={() => navigate('/')}>home</button>
      <p>no favorites</p>
    </>
  );
};

export default Favorites;
