import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { useAuth } from './auth/AuthContext';
import Favorites from './components/Favorites';
import Home from './components/Home';
import { db } from './firebase';

const App = () => {
  const { currentUser } = useAuth();
  const [favorites, setFavorites] = useState<any[]>([]);

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

  return (
    <Routes>
      <Route path="/" element={<Home setFavorites={setFavorites}/>} />
      <Route path="/favorites" element={<Favorites favorites={favorites} setFavorites={setFavorites} />} />
    </Routes>
  );
};

export default App;
