import axios from "axios";
import { getAuthToken } from './authService';

const REST_API_BASE_URL = import.meta.env.VITE_BASE_URL;

export const crearReserva = async (reservaData) => {
  try {
    const token = getAuthToken();
    const response = await axios.post(`${REST_API_BASE_URL}/api/reservas`, reservaData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error("Error al crear reserva:", error);
    throw error;
  }
};

export const obtenerMisReservas = async () => {
  try {
    const token = getAuthToken();
    const response = await axios.get(`${REST_API_BASE_URL}/api/reservas/mis-reservas`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener mis reservas:", error);
    throw error;
  }
};

export const obtenerFechasOcupadas = async () => {
  try {
    const token = getAuthToken();
    const response = await axios.get(`${REST_API_BASE_URL}/api/reservas/fechas-ocupadas`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener fechas ocupadas:", error);
    throw error;
  }
};

// Para administradores
export const obtenerTodasLasReservas = async () => {
  try {
    const token = getAuthToken();
    const response = await axios.get(`${REST_API_BASE_URL}/api/reservas`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener todas las reservas:", error);
    throw error;
  }
};

export const actualizarReserva = async (reservaData) => {
  try {
    const token = getAuthToken();
    const response = await axios.patch(`${REST_API_BASE_URL}/api/reservas`, reservaData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error("Error al actualizar reserva:", error);
    throw error;
  }
};

export const buscarReservaPorFolio = async (folio) => {
  try {
    const token = getAuthToken();
    const response = await axios.get(`${REST_API_BASE_URL}/api/reservas/${folio}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error("Error al buscar reserva por folio:", error);
    throw error;
  }
};

export const obtenerHistorialReserva = async (reservaId) => {
  try {
    const token = getAuthToken();
    const response = await axios.get(`${REST_API_BASE_URL}/api/reservas/historial/${reservaId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener el historial de la reserva:", error);
    throw error;
  }
};