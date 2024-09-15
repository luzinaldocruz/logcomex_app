<template>
  <div class="container">
    <img :src="leftImage" class="left-image" alt="Left Image" />
    <div class="content">
      <!-- Formulário ou conteúdo principal -->
      <PokemonCard v-if="selectedPokemon" :pokemon="selectedPokemon" @closeCard="selectedPokemon = null" />
      <PokemonList @pokemonSelected="showPokemonDetails" />
    </div>
    <img :src="rightImage" class="right-image" alt="Right Image" />
  </div>
</template>

<script>
import PokemonList from '../components/PokemonList.vue';
import PokemonCard from '../components/PokemonCard.vue';
import leftImage from '../assets/pokeball.png';
import rightImage from '../assets/pikachu.png';

export default {
  components: {
    PokemonList,
    PokemonCard
  },
  data() {
    return {
      selectedPokemon: null,
      leftImage,
      rightImage
    };
  },
  methods: {
    showPokemonDetails(pokemon) {
      this.selectedPokemon = pokemon;
    }
  }
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100vh;
  padding: 0 20px;
  box-sizing: border-box;
}

.left-image, .right-image {
  width: 150px;
  height: auto;
}

.content {
  flex: 1; 
  text-align: center; 
}
</style>
