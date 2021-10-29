import React, { useState, useEffect, useContext, createContext } from 'react';
import api from './api';
import { setTokenHeader } from './api';

const API_URL = 'auth/';
const TOKEN = 'token';

const authContext = createContext();

function useAuthProvider() {
  const [token, setToken] = useState(getToken());
  const [user, setUser] = useState({});

  const login = async (email, password) => {
    const { data: token } = await api.post(API_URL + 'login', { email, password });
    localStorage.setItem(TOKEN, token);
    setToken(token);
  };

  const logout = () => {
    localStorage.removeItem(TOKEN);
    setToken(null);
  };

  function getToken() {
    return localStorage.getItem(TOKEN);
  }

  const getCurrentUser = async () => {
    const { data: user } = await api.get(API_URL + 'me');
    setUser(user);
  };

  setTokenHeader(token);

  return {
    token,
    user,
    login,
    logout,
    getToken,
    getCurrentUser,
  };
}

export function AuthProvider({ children }) {
  const auth = useAuthProvider();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export function useAuth() {
  return useContext(authContext);
}
