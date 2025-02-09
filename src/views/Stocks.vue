<script>
import axios from "axios";
import Header from "../components/Header.vue";

export default {
  name: "StockIngredients",
  components: {
    Header,
  },
  data() {
    return {
      dateAujourdhui: new Date().toLocaleDateString(), // Date du jour
      ingredients: [],
    };
  },
  mounted() {
    this.fetchIngredients(); // Récupérer les ingrédients au chargement du composant
  },
  methods: {
    async fetchIngredients() {
      try {
        const response = await axios.get(
          "https://miammiam3-production.up.railway.app/api/ingredients"
        );
        
        // Extraire la liste des ingrédients depuis 'member'
        this.ingredients = response.data.member.map(ingredient => ({
          id: ingredient.id,
          nom: ingredient.name, // Nom de l'ingrédient
          quantite: ingredient.stockQuantity, // Quantité en stock
          imageUrl: ingredient.imageUrl, // URL de l'image
        }));
      } catch (error) {
        console.error("Erreur lors de la récupération des ingrédients :", error);
      }
    },
  },
};
</script>

<template>
  <Header />
  <div class="container">
    <h1>Stock des ingrédients</h1>
    <p>Date de consultation : {{ dateAujourdhui }}</p>
    <div class="ingredient-list">
      <div v-for="ingredient in ingredients" :key="ingredient.id" class="ingredient-card">
        <!-- <img :src="ingredient.imageUrl" :alt="ingredient.nom" class="ingredient-image" /> -->
        <h2>{{ ingredient.nom }}</h2>
        <p>Stock : {{ ingredient.quantite }} unités</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 900px;
  margin: 50px auto;
  padding: 20px;
  text-align: center;
  background: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h1 {
  color: #333;
  font-size: 24px;
  margin-bottom: 10px;
}

p {
  font-style: italic;
  color: #555;
  margin-bottom: 20px;
}

.ingredient-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.ingredient-card {
  width: 200px;
  background: white;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.ingredient-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
  margin-bottom: 10px;
}

h2 {
  font-size: 18px;
  color: #333;
  margin-bottom: 5px;
}
</style>
