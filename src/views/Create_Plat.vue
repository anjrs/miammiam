<script>
import axios from "axios";
import Header from "../components/Header.vue";

export default {
  name: "Create_Plat",
  components: {
    Header,
  },
  data() {
    return {
      name: "",
      price: "",
      cookingDuration: "",
      dishIngredients: [{ ingredient: "", quantity: "" }],
      ingredientsDisponibles: [],
    };
  },
  mounted() {
    this.fetchIngredients();
  },
  methods: {
    async fetchIngredients() {
      try {
        const response = await axios.get("https://miammiam3-production.up.railway.app/api/ingredients");
        this.ingredientsDisponibles = response.data.member;
      } catch (error) {
        console.error("Erreur lors du chargement des ingrédients :", error);
        alert("Erreur lors du chargement des ingrédients. Veuillez réessayer plus tard.");
      }
    },
    addIngredient() {
      this.dishIngredients.push({ ingredient: "", quantity: "" });
    },
    async addPlat() {
      if (!this.name || !this.price || !this.cookingDuration || this.dishIngredients.some(i => !i.ingredient || !i.quantity)) {
        alert("Tous les champs doivent être remplis, y compris les ingrédients et leurs quantités.");
        return;
      }

      const dishData = {
        name: this.name,
        price: this.price.toString(),
        cookingDuration: parseInt(this.cookingDuration, 10),
      };

      try {
        const response = await axios.post(
          "https://miammiam3-production.up.railway.app/api/dishes",
          dishData,
          { headers: { "Content-Type": "application/ld+json" } }
        );
        const createdDish = response.data;

        const dishIngredientsPromises = this.dishIngredients.map(ingredient => {
          return axios.post("https://miammiam3-production.up.railway.app/api/dish_ingredients", {
            dish: createdDish["@id"],
            ingredient: `/api/ingredients/${ingredient.ingredient}`,
            quantity: parseInt(ingredient.quantity, 10)
          }, { headers: { "Content-Type": "application/ld+json" } });
        });

        await Promise.all(dishIngredientsPromises);
        alert("Plat et ingrédients ajoutés avec succès !");
      } catch (error) {
        console.error("Erreur lors de l'ajout du plat ou des ingrédients :", error);
        alert("Erreur lors de l'ajout du plat ou des ingrédients.");
      }
    }
  }
};
</script>

<template>
  <Header />
  <div class="container">
    <h1>Créer un nouveau plat</h1>
    <form @submit.prevent="addPlat">
      <div class="form-group">
        <label for="name">Nom du plat :</label>
        <input type="text" id="name" v-model="name" required />
      </div>

      <div class="form-group">
        <label for="price">Prix (Ariary) :</label>
        <input type="number" id="price" v-model="price" required />
      </div>

      <div class="form-group">
        <label for="cookingDuration">Durée de cuisson (sec) :</label>
        <input type="number" id="cookingDuration" v-model="cookingDuration" required />
      </div>

      <div class="form-group">
        <h3>Ingrédients</h3>
        <div v-for="(ingredient, index) in dishIngredients" :key="index" class="ingredient-group">
          <label :for="'ingredient-' + index">Ingrédient :</label>
          <select v-model="ingredient.ingredient" :id="'ingredient-' + index" required>
            <option disabled value="">Sélectionner l'ingrédient</option>
            <option v-for="ingredientOption in ingredientsDisponibles" :key="ingredientOption.id" :value="ingredientOption.id">
              {{ ingredientOption.name }}
            </option>
          </select>
          <label :for="'quantity-' + index">Quantité :</label>
          <input type="number" v-model="ingredient.quantity" :id="'quantity-' + index" required />
        </div>
        <button type="button" @click="addIngredient" class="add-ingredient-button">Ajouter un ingrédient</button>
      </div>

      <button type="submit" class="submit-button">Créer le plat</button>
    </form>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

.container {
  max-width: 600px;
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

.form-group {
  margin-bottom: 15px;
}

.ingredient-group {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
}

label {
  display: block;
  font-weight: bold;
  color: #444;
}

input, select {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  box-sizing: border-box;
}

.add-ingredient-button, .submit-button {
  display: block;
  width: 100%;
  padding: 10px;
  background-color: #a3d2ca;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  margin-top: 10px;
}

.add-ingredient-button:hover, .submit-button:hover {
  background-color: #5eaaa8;
}
</style>