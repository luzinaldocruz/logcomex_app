import axios from 'axios';

const api = axios.create({
    baseURL: process.env.API_BASE_URL
});

export const fetchAllPokemons = () => api.get('pokemon');
export const fetchPokemonDetails = (nameOrId) => api.get(`pokemon/${nameOrId}`);

export default api;