import api from './api';

const API_URL = 'offices/';

export const getOffices = async () => {
  const { data: offices } = await api.get(API_URL);
  return offices;
};

export const getOfficesCount = async () => {
  const { data: officesCount } = await api.get(API_URL + 'count');
  return officesCount;
};

export const getOffice = async (id) => {
  const { data: office } = await api.get(API_URL + id);
  return office;
};

export const addOffice = async (data) => {
  const { data: office } = await api.post(API_URL, data);
  return office;
};

export const updateOffice = async (id, data) => {
  const { data: office } = await api.put(API_URL + id, data);
  return office;
};

export const deleteOffice = async (id) => {
  const { data: office } = await api.delete(API_URL + id);
  return office;
};
