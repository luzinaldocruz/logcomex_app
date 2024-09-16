<template>
  <div class="container">
    <img :src="leftImage" class="left-image" alt="Left Image" />
    <div class="content">
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
  flex-wrap: wrap;
}

.left-image, .right-image {
  width: 150px;
  height: auto;
}

.content {
  flex: 1; 
  text-align: center; 
}

@media (max-width: 768px) {
  .container {
    flex-direction: column; 
    justify-content: center;
    height: auto;
  }

  .left-image, .right-image {
    width: 100px; 
    margin: 10px 0;
  }

  .content {
    padding: 20px;
  }
}
@media (max-width: 480px) {
  .left-image, .right-image {
    width: 80px;
  }
}
</style>
