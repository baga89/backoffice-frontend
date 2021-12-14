import React, { useState, useEffect, createContext, useContext } from 'react';
import api from './api';
import { setTokenHeader } from './api';

const API_URL = 'auth/';
const TOKEN = 'token';

const authContext = createContext();

export function AuthProvider({ children }) {
  const auth = useAuthProvider();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export function useAuth() {
  return useContext(authContext);
}

function useAuthProvider() {
  const [token, setToken] = useState(getToken());
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    const { data: token } = await api.post(API_URL + 'login', { email, password });
    localStorage.setItem(TOKEN, token);
    setToken(token);
  };

  const logout = () => {
    localStorage.removeItem(TOKEN);
    setToken(null);
    setUser(null);
  };

  function getToken() {
    return localStorage.getItem(TOKEN);
  }

  const getUser = async () => {
    setLoading(true);
    try {
      const { data: user } = await api.get(API_URL + 'me');
      setUser(user);
    } catch (error) {
      setError(error.response.data);
      console.log(error.response);
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (firstName, lastName, email) => {
    const { data: user } = await api.put(API_URL + 'updateuser', { firstName, lastName, email });
    setUser(user);
    return user;
  };

  const updatePassword = async (currentPassword, newPassword) => {
    const { data: token } = await api.put(API_URL + 'updatepassword', { currentPassword, newPassword });
    localStorage.setItem(TOKEN, token);
    setToken(token);
  };

  setTokenHeader(token);

  useEffect(() => {
    if (localStorage.token) {
      getUser();
    }

    window.addEventListener('storage', () => {
      if (!localStorage.token) {
        setToken(null);
        setUser(null);
      }
    });

    return () => window.removeEventListener('storage');
  }, [token]);

  return {
    loading,
    error,
    token,
    user,
    login,
    logout,
    getToken,
    updateUser,
    updatePassword,
  };
}
