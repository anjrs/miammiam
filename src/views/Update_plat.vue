<script>
import axios from "axios";
import Header from "../components/Header.vue";

export default {
  name: "UpdatePlat",
  components: {
    Header,
  },
  props: {
    id: String, // ✅ Vérification que l'ID est bien reçu en prop
  },
  data() {
    return {
      name: "",
      cookingDuration: "",
      price: "",
      ingredients: [],
      ingredientOptions: [],
    };
  },
  async mounted() {
    if (!this.id) {
      console.error("Aucun ID reçu pour la mise à jour du plat");
      return;
    }
    await this.fetchPlat();
    await this.fetchIngredients();
  },
  methods: {
    async fetchIngredients() {
      try {
        const response = await axios.get("https://miammiam3-production.up.railway.app/api/ingredients");
        this.ingredientOptions = response.data.member;
      } catch (error) {
        console.error("Erreur lors du chargement des ingrédients :", error);
      }
    },
    
    async fetchPlat() {
      try {
        const response = await axios.get(`https://miammiam3-production.up.railway.app/api/dishes/${this.id}`);
        const plat = response.data;
        this.name = plat.name;
        this.cookingDuration = plat.cookingDuration;
        this.price = plat.price;

        // Récupérer les détails des ingrédients du plat
        const dishIngredientsResponse = await axios.get("https://miammiam3-production.up.railway.app/api/dish_ingredients");
        const dishIngredients = dishIngredientsResponse.data.member.filter(
          (item) => item.dish === `/api/dishes/${this.id}`
        );

        const ingredientPromises = dishIngredients.map(async (dishIngredient) => {
          const ingredientResponse = await axios.get(
            `https://miammiam3-production.up.railway.app${dishIngredient.ingredient}`
          );
          return {
            id: ingredientResponse.data.id,
            name: ingredientResponse.data.name,
            quantity: dishIngredient.quantity,
          };
        });

        this.ingredients = await Promise.all(ingredientPromises);
      } catch (error) {
        console.error("Erreur lors du chargement du plat :", error);
      }
    },
    
    addIngredient() {
      this.ingredients.push({ id: "", quantity: "" });
    },
    
    removeIngredient(index) {
      this.ingredients.splice(index, 1);
    },
    
    async submitForm() {
      const platData = {
        name: this.name,
        price: this.price.toString(),
        cookingDuration: parseInt(this.cookingDuration, 10),
      };

      try {
        const response = await axios.patch(
          `https://miammiam3-production.up.railway.app/api/dishes/${this.id}`,
          platData,
          { headers: { "Content-Type": "application/merge-patch+json" } }
        );

        const createdDish = response.data;

        // Mettre à jour les ingrédients du plat
        const dishIngredientsPromises = this.ingredients.map(ingredient => {
          return axios.post("https://miammiam3-production.up.railway.app/api/dish_ingredients", {
            dish: createdDish["@id"],
            ingredient: `/api/ingredients/${ingredient.id}`,
            quantity: parseInt(ingredient.quantity, 10)
          }, { headers: { "Content-Type": "application/ld+json" } });
        });

        await Promise.all(dishIngredientsPromises);

        this.$router.push({ name: "ListePlats" });
      } catch (error) {
        console.error("Erreur lors de la mise à jour du plat :", error);
      }
    },
  },
};
</script>

<template>
  <div>
    <Header />
    <div class="container">
      <h1>Mettre à jour un plat :</h1>
      <form @submit.prevent="submitForm">
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
          <ul v-if="ingredients.length">
            <li v-for="(ingredient, index) in ingredients" :key="index" class="ingredient-group">
              <label :for="'ingredient-' + index">Ingrédient :</label>
              <select v-model="ingredient.id" :id="'ingredient-' + index" required>
                <option disabled value="">Sélectionner l'ingrédient</option>
                <option v-for="ingredientOption in ingredientOptions" :key="ingredientOption.id" :value="ingredientOption.id">
                  {{ ingredientOption.name }}
                </option>
              </select>
              <label :for="'quantity-' + index">Quantité :</label>
              <input type="number" v-model="ingredient.quantity" :id="'quantity-' + index" required />
              <button type="button" @click="removeIngredient(index)" class="delete-button">Supprimer</button>
            </li>
          </ul>
          <p v-else>(Chargement des ingrédients...)</p>
          <button type="button" @click="addIngredient" class="add-button">Ajouter un ingrédient</button>
        </div>
        <button type="submit" class="submit-button">Valider</button>
      </form>
    </div>
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

button {
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

button:hover {
  background-color: #5eaaa8;
}

.delete-button {
  background-color: #ff4d4d;
  color: white;
  width: auto;
  margin-top: 0;
}

.delete-button:hover {
  background-color: #e60000;
}

.ingredient-group {
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>