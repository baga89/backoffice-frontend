import api from './api';

const API_URL = 'users/';

export const getUsers = async () => {
  const { data: users } = await api.get(API_URL);
  return users;
};

export const getUser = async (id) => {
  const { data: user } = await api.get(API_URL + id);
  return user;
};

export const addUser = async (data) => {
  const { data: user } = await api.post(API_URL, data);
  return user;
};

export const updateUser = async (id, data) => {
  const { data: user } = await api.put(API_URL + id, data);
  return user;
};

export const deleteUser = async (id) => {
  const { data: user } = await api.delete(API_URL + id);
  return user;
};
