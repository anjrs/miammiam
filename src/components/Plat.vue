<script>
import axios from "axios";

export default {
  name: "Plat",
  props: {
    plat: Object,
  },
  data() {
    return {
      ingredients: [],
    };
  },
  mounted() {
    this.fetchIngredients();
  },
  methods: {
    updatePlat(plat) {
      this.$router.push({ path: `/update-plat/${plat.id}` }); // Navigue vers la page d'update avec l'ID
    },
    async deletePlat(plat) {
      try {
        const response = await axios.delete(
          `https://miammiam3-production.up.railway.app/api/dishes/${plat.id}`,
          {
            headers: {
              "Content-Type": "application/ld+json",
            },
          }
        );
        console.log("Plat supprimé avec succès:", response.data);
        this.$emit("delete", plat.id); // Émet un événement pour supprimer le plat localement
      } catch (error) {
        console.error("Erreur lors de la suppression du plat:", error);
      }
    },
    async fetchIngredients() {
      try {
        // 1️⃣ Récupérer les dish_ingredients pour ce plat
        const response = await axios.get(
          "https://miammiam3-production.up.railway.app/api/dish_ingredients"
        );

        // 2️⃣ Filtrer ceux qui concernent CE plat
        const dishIngredients = response.data.member.filter(
          (item) => item.dish === `/api/dishes/${this.plat.id}`
        );

        // 3️⃣ Récupérer les détails de chaque ingrédient
        const ingredientPromises = dishIngredients.map(async (dishIngredient) => {
          const ingredientResponse = await axios.get(
            `https://miammiam3-production.up.railway.app${dishIngredient.ingredient}`
          );
          return {
            id: ingredientResponse.data.id,
            nom: ingredientResponse.data.name,
            quantite: dishIngredient.quantity, // Quantité nécessaire
          };
        });

        this.ingredients = await Promise.all(ingredientPromises);
      } catch (error) {
        console.error("Erreur lors de la récupération des ingrédients:", error);
      }
    },
  },
};
</script>

<template>
  <div class="plat-card">
    <h2>{{ plat.name }}</h2>
    <p><strong>Temps de cuisson:</strong> {{ plat.cookingDuration }} min</p>
    <p><strong>Prix:</strong> {{ plat.price }} Ariary</p>

    <p><strong>Ingrédients:</strong></p>
    <ul v-if="ingredients.length">
      <li v-for="ingredient in ingredients" :key="ingredient.id">
        {{ ingredient.nom }} - {{ ingredient.quantite }} unités
      </li>
    </ul>
    <p v-else>(Chargement des ingrédients...)</p>

    <div class="button-group">
      <button @click="updatePlat(plat)">Modifier</button>
      <button @click="deletePlat(plat)" class="delete">Supprimer</button>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

.plat-card {
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 8px;
  background: #f9f9f9;
  margin-bottom: 20px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  font-family: 'Roboto', sans-serif;
  max-width: 400px;
  margin: 20px auto;
}

h2 {
  margin-bottom: 10px;
  color: #333;
  font-size: 20px;
}

p {
  margin: 5px 0;
  color: #555;
}

ul {
  padding: 0;
  list-style-type: none;
}

li {
  background: #eee;
  padding: 8px;
  margin: 5px 0;
  border-radius: 5px;
  font-size: 14px;
}

.button-group {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

button {
  padding: 8px 12px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  font-size: 14px;
  font-weight: bold;
  background-color: #a3d2ca;
  color: white;
}

button:hover {
  background-color: #5eaaa8;
}

.delete {
  background-color: #ff4d4d;
  color: white;
}

.delete:hover {
  background-color: #e60000;
}
</style>