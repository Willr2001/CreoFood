import { doc, updateDoc } from 'firebase/firestore';
import React, { Dispatch, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { db } from '../firebase';

const Favorites = (props: { favorites: any; setFavorites: Dispatch<SetStateAction<any>> }) => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const removeFavorite = async (recipeTitle: any) => {
    if (currentUser) {
      const newFavorites = props.favorites.filter((recipe: any) => recipe.title !== recipeTitle);
      const userRef = doc(db, 'users', currentUser.uid);
      await updateDoc(userRef, { favoriteRecipes: newFavorites });
      props.setFavorites(newFavorites);
    }
  };

  return props.favorites.length !== 0 ? (
    <>
      <button onClick={() => navigate('/')}>home</button>
      {props.favorites.map((favorite: any) => (
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
