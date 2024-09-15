<template>
  <div class="modal-overlay" @click="$emit('closeCard')">
    <div class="pokemon-modal" v-if="pokemonDetails" @click.stop>
      <h2>{{ pokemonDetails.name }}</h2>
      <img :src="pokemonDetails.sprite" alt="Pokemon Image">
      <p>Types: {{ pokemonDetails.types }}</p>
      <p>Height: {{ pokemonDetails.height }} cm</p>
      <p>Weight: {{ pokemonDetails.weight }} kg</p>
      <button class="close-button" @click="$emit('closeCard')">Close</button>
    </div>
  </div>
</template>

<script>
import { fetchPokemonDetails } from '../services/api';

export default {
  props: ['pokemon'],
  data() {
    return {
      pokemonDetails: null
    };
  },
  async created() {
    this.getPokemonDetails();
  },
  methods: {
    async getPokemonDetails() {
      try {
        const response = await fetchPokemonDetails(this.pokemon.name);
        this.pokemonDetails = response.data;
      } catch (error) {
        console.error('Error fetching Pokemon details:', error);
      }
    }
  },
  computed: {
    types() {
      return this.pokemonDetails.types.map(type => type.type.name).join(', ');
    }
  }
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.pokemon-modal {
  background-color: #072654;
  border: 2px solid #ffa500;
  padding: 20px;
  border-radius: 15px;
  width: 300px;
  height: 400px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

img {
  max-width: 100px;
  border-radius: 50%;
}

.close-button {
  background: #ff6347;
  border: none;
  padding: 5px 10px;
  color: white;
  border-radius: 10px;
  cursor: pointer;
  margin-top: 15px;
}

.close-button:hover {
  background: #ff4500;
}
</style>
