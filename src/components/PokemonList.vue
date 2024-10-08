<template>
  <div class="pokemon-list">
    <h1 class="title">Pokémon List</h1>

    <div class="search-container">
      <input 
        type="text" 
        v-model="searchQuery" 
        placeholder="Search Pokémon by name"
        class="search-box"
      />
    </div>

    <ul class="pokemons">
      <li v-for="pokemon in paginatedPokemons" :key="pokemon.name" @click="selectPokemon(pokemon)">
        {{ pokemon.name }}
      </li>
    </ul>
    
    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
    </div>

    <div v-if="loading">
      <p>Loading Pokémons...</p>
    </div>
  </div>
</template>

<script>
import { fetchAllPokemons } from '../services/api';

export default {
  data() {
    return {
      allPokemons: [],
      searchQuery: '',
      currentPage: 1,
      perPage: 10,
      totalPokemons: 0,
      loading: false,
    };
  },
  created() {
    this.getAllPokemons();
  },
  computed: {
    totalPages() {
      return Math.ceil(this.filteredPokemons.length / this.perPage);
    },
    filteredPokemons() {
      this.applySearch();
      return this.allPokemons.filter(pokemon =>
        pokemon.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
    paginatedPokemons() {
      const start = (this.currentPage - 1) * this.perPage;
      const end = this.currentPage * this.perPage;
      return this.filteredPokemons.slice(start, end);
    }
  },
  methods: {
    async getAllPokemons() {
      try {
        this.loading = true;
        let allData = [];
        const response = await fetchAllPokemons();
        allData = allData.concat(response.data.data);
        this.allPokemons = allData; 
        this.totalPokemons = allData.length;
        this.loading = false;
      } catch (error) {
        console.error('Error fetching all Pokémons:', error);
        this.loading = false;
      }
    },
    applySearch() {
      this.currentPage = 1;
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    selectPokemon(pokemon) {
      this.$emit('pokemonSelected', pokemon); // Emite o evento para o card
    }
  }
};
</script>

<style scoped>
.pokemon-list {
  text-align: center;
  padding: 20px;
}

.search-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  width: 300px;
}

.search-box {
  width: 70%;
  padding: 10px;
  border: 2px solid #ffa500;
  border-radius: 5px;
}

.search-button {
  padding: 10px;
  background-color: #ff6347;
  color: white;
  border: none;
  border-radius: 5px;
  margin-left: 10px;
  cursor: pointer;
}

.search-button:hover {
  background-color: #ff4500;
}

ul.pokemons {
  list-style: none;
  padding: 0;
  min-height: 500px; 
  overflow-y: auto; 
  margin: 0 auto;
  width: 300px;
}

ul.pokemons li {
  cursor: pointer;
  padding: 10px;
  background: #ffd700;
  color: black;
  margin: 5px;
  border-radius: 10px;
  transition: background 0.3s;
}

ul.pokemons li:hover {
  background: #ffebcd;
}

.pagination {
  margin-top: 20px;
}

.pagination button {
  margin: 0 5px;
  padding: 5px 10px;
  border: none;
  background-color: #ff6347;
  color: white;
  border-radius: 5px;
  cursor: pointer;
}

.pagination button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.title {
  font-size: 2.5rem;
  font-family: 'Comic Sans MS', sans-serif;
  color: #ff6347;
}

@media (max-width: 768px) {
  .pokemon-list {
    padding: 10px;
  }

  .title {
    font-size: 2rem; 
  }

  .search-container {
    width: 100%;
  }

  .search-box {
    width: 100%; 
  }


  ul.pokemons {
    max-width: 100%; 
  }
}

@media (max-width: 480px) {
  .title {
    font-size: 1.8rem; 
  }

  .search-box {
    padding: 8px; 
  }

  ul.pokemons li {
    padding: 8px; 
  }
}
</style>
