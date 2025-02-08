<script>
import axios from "axios";
import Header from "../components/Header.vue";
 // Assurez-vous d'avoir axios installé

export default {
  name: "StockIngredients",
  components : {
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
        const ingredientData = response.data.member;

        // Boucle pour récupérer les informations de chaque ingrédient
        this.ingredients = ingredientData.map(ingredient => ({
          nom: ingredient.name, // Nom de l'ingrédient
          quantite: ingredient.stockQuantity, // Quantité en stock
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
    <table>
      <thead>
        <tr>
          <th>Nom de l'ingrédient</th>
          <th>Quantité restante</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="ingredient in ingredients" :key="ingredient.nom">
          <td>{{ ingredient.nom }}</td>
          <td>{{ ingredient.quantite }} unités</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

.container {
  max-width: 800px;
  margin: 50px auto;
  padding: 30px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background: #f9f9f9;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  font-family: 'Roboto', sans-serif;
}

h1 {
  text-align: center;
  color: #333;
  font-size: 24px;
  margin-bottom: 20px;
}

p {
  font-style: italic;
  color: #555;
  margin-bottom: 20px;
  text-align: center;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th, td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: left;
}

th {
  background-color: #a3d2ca;
  color: white;
}

tr:nth-child(even) {
  background-color: #f9f9f9;
}

tr:hover {
  background-color: #f1f1f1;
}
</style>