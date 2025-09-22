import axios from "axios";
import { getAuthToken } from './authService';

const REST_API_BASE_URL = import.meta.env.VITE_BASE_URL;

export const obtenerEspacios = async () => {
  try {
    const token = getAuthToken();
    const response = await axios.get(`${REST_API_BASE_URL}/api/espacios`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener espacios:", error);
    throw error;
  }
};

export const obtenerEspacioPorId = async (id) => {
  try {
    const token = getAuthToken();
    const response = await axios.get(`${REST_API_BASE_URL}/api/espacios/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error(`Error al obtener el espacio con id ${id}:`, error);
    throw error;
  }
};