import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../Firebase/Firebase.js';
import { fetchUserDetails } from '../Firebase/Utils/users.utils.js';
import { useRefresh } from './RefreshContext.jsx';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userDetails, setUserDetails] = useState(null)
  const [loading, setLoading] = useState(true);
  const{refresh} = useRefresh();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if(currentUser){
        const userDetails = await fetchUserDetails(currentUser.uid)
        setUserDetails(userDetails);
      } 
      setLoading(false);
    });
    return () => unsubscribe();
  }, [refresh]);

  return (
    <AuthContext.Provider value={{ user, userDetails, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}