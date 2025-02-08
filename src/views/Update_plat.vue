<script>
import axios from "axios";

export default
{
  name: "UpdatePlat",
  props:
  {
    id: String, // ✅ Vérification que l'ID est bien reçu en prop
  },
  data()
  {
    return{
      name: "",
      cookingDuration: "",
      price: "",
      ingredients: [],
      ingredientOptions: [],
    };
  },
  async mounted()
  {
    if (!this.id)
    {
      console.error("Aucun ID reçu pour la mise à jour du plat");
      return;
    }
    await this.fetchPlat();
    await this.fetchIngredients();
  },
  methods:
  {
    async fetchIngredients()
    {
      try
      {
        const response = await axios.get("https://miammiam3-production.up.railway.app/api/ingredients");
        this.ingredientOptions = response.data.member;
      } 
      catch (error)
      {
        console.error("Erreur lors du chargement des ingrédients :", error);
      }
    },
    
    async fetchPlat()
    {
      try
      {
        const response = await axios.get(`https://miammiam3-production.up.railway.app/api/dishes/${this.id}`);
        const plat = response.data;
        this.name = plat.name;
        this.cookingDuration = plat.cookingDuration;
        this.price = plat.price;
        this.ingredients = plat.dishIngredients.map((ing) => ({ name: ing.name, quantity: ing.quantity }));
      } 
      catch (error)
      {
        console.error("Erreur lors du chargement du plat :", error);
      }
    },
    
    addIngredient()
    {
      this.ingredients.push({ name: "", quantity: "" });
    },
    
    removeIngredient(index) {
      this.ingredients.splice(index, 1);
    },
    
    async submitForm()
    {
      const platData =
      {
        name: this.name,
        cookingDuration: Number(this.cookingDuration),
        price: Number(this.price),
        ingredients: this.ingredients.map(ing => ({ name: ing.name, quantity: Number(ing.quantity) })),
      };
      
      console.log("Données envoyées :", JSON.stringify(platData, null, 2));
      
      try
      {
        await axios.patch(
          `https://miammiam3-production.up.railway.app/api/dishes/${this.id}`,
          platData,
          { headers: { "Content-Type": "application/json" } }
        );
        this.$router.push({ name: "ListePlats" });
      } 
      catch (error)
      {
        console.error("Erreur lors de la mise à jour du plat :", error);
      }
    },
  },
};
</script>

<template>
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
        <div v-for="(ingredient, index) in ingredients" :key="index" class="ingredient-group">
          <label :for="'ingredient-' + index">Ingrédient :</label>
          <select v-model="ingredient.name" :id="'ingredient-' + index" required>
            <option disabled value="">Sélectionner l'ingrédient</option>
            <option v-for="ingredientOption in ingredientOptions" :key="ingredientOption.id" :value="ingredientOption.name">
              {{ ingredientOption.name }}
            </option>
          </select>
          <label :for="'quantity-' + index">Quantité :</label>
          <input type="number" v-model="ingredient.quantity" :id="'quantity-' + index" required />
          <button type="button" @click="removeIngredient(index)">Supprimer</button>
        </div>
        <button type="button" @click="addIngredient">Ajouter un ingrédient</button>
      </div>
      <button type="submit">Valider</button>
    </form>
  </div>
</template>

<style scoped>
.container {
  max-width: 600px;
  margin: auto;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}
form {
  display: flex;
  flex-direction: column;
}
label {
  margin-top: 10px;
  font-weight: bold;
}
input, select {
  padding: 8px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
button {
  margin-top: 15px;
  padding: 10px;
  background: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
button:hover {
  background: #45a049;
}
.ingredient-group {
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>
