import firebase, {
  createUserWithEmailAndPassword,
  getAdditionalUserInfo,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import React, { createContext, useContext, useEffect, useState } from 'react';

import { auth, db } from '../firebase';

interface Context {
  currentUser: firebase.User | undefined;
  login: (email: string, password: string) => Promise<any>;
  signup: (email: string, password: string) => Promise<any>;
  logout: () => Promise<any>;
  resetPassword: (email: string) => Promise<any>;
  loginWithGoogle: () => Promise<any>;
}

const AuthContext = createContext<Context | null>(null);

export const AuthProvider = ({ children }: any) => {
  const [currentUser, setCurrentUser] = useState<firebase.User>();
  const [loading, setLoading] = useState<boolean>(true);

  const addNewUserToDb = async (uid: string, email: string) => {
    await setDoc(doc(db, 'users', uid), { email, favoriteRecipes: [] });
  };

  const signup = async (email: string, password: string) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      await addNewUserToDb(res.user.uid, email);
    } catch (error: any) {
      return alert(error);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      return alert(error);
    }
  };

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const res = await signInWithPopup(auth, provider);
    const details = getAdditionalUserInfo(res);
    const email = res.user.email;
    if (details?.isNewUser && email) {
      await addNewUserToDb(res.user.uid, email);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      window.location.reload();
    } catch (error: any) {
      return alert(error);
    }
  };

  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error: any) {
      return alert(error);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onIdTokenChanged(async (user) => {
      setLoading(true);
      if (!user) {
        setCurrentUser(undefined);
      } else {
        setCurrentUser(user);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        login,
        signup,
        logout,
        loginWithGoogle,
        resetPassword,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): Context => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth must be within AuthProvider');
  }
  return context;
};
