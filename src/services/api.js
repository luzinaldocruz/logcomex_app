import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api-log-46183c5770a7.herokuapp.com/api'
});

export const fetchAllPokemons = () => api.get('pokemon?limit=5000');
export const fetchPokemonDetails = (nameOrId) => api.get(`pokemon/${nameOrId}`);

export default api;