import axios from "axios";
const REST_API_BASE_URL = import.meta.env.VITE_BASE_URL

export const getAuthToken = () => {
    try {
        const tokenString = localStorage.getItem('authToken');
        const tokenData = JSON.parse(tokenString);
        return tokenData?.accessToken || null;        
    } catch (error) {
        console.error("Error al obtener token de localStorage:", error);
        return null;
    }
};

// Function to create headers with the Authorization token
const getHeaders = () => ({  
    headers: {
        Authorization: `Bearer ${getAuthToken()}`,
    },
});

export const login = (loginData) =>
    axios.post(`${REST_API_BASE_URL}/api/auth/login`, loginData)


export const isAdminBool = () =>
    axios.get(`${REST_API_BASE_URL}/api/auth/isadmin`, getHeaders())


