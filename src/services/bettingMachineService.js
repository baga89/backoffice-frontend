import api from './api';

const API_URL = 'betting-machines/';

export const getBettingMachines = async () => {
  const { data: bettingMachines } = await api.get(API_URL);
  return bettingMachines;
};

export const getBettingMachine = async (id) => {
  const { data: bettingMachine } = await api.get(API_URL + id);
  return bettingMachine;
};

export const addBettingMachine = async (data) => {
  const { data: bettingMachine } = await api.post(API_URL, data);
  return bettingMachine;
};

export const updateBettingMachine = async (id, data) => {
  const { data: bettingMachine } = await api.put(API_URL + id, data);
  return bettingMachine;
};

export const deleteBettingMachine = async (id) => {
  const { data: bettingMachine } = await api.delete(API_URL + id);
  return bettingMachine;
};
