<script>
export default {
  name: "PlatForm",
  props: {
    plat: Object,
  },
  data() {
    return {
      nom: this.plat ? this.plat.nom : "",
      tempsCuisson: this.plat ? this.plat.tempsCuisson : "",
      prix: this.plat ? this.plat.prix : "",
      ingredients: this.plat
        ? [...this.plat.ingredients]
        : [{ nom: "", quantite: "" }],
      ingredientOptions: ["Riz", "Poulet", "Oeuf", "Curry", "Sel", "Poivre"],
    };
  },
  methods: {
    addIngredient() {
      this.ingredients.push({ nom: "", quantite: "" });
    },
    removeIngredient(index) {
      this.ingredients.splice(index, 1);
    },
    submitForm() {
      const platData = {
        nom: this.nom,
        tempsCuisson: this.tempsCuisson,
        prix: this.prix,
        ingredients: this.ingredients,
      };
      this.$emit("save", platData);
    },
  },
};
</script>

<template>
  <div class="plat-form">
    <h2>{{ plat ? "Modifier le plat" : "Ajouter un plat" }}</h2>
    <form @submit.prevent="submitForm">
      <label>Nom du plat :</label>
      <input v-model="nom" type="text" required />

      <label>Temps de cuisson (en secondes) :</label>
      <input v-model.number="tempsCuisson" type="number" required />

      <label>Prix :</label>
      <input v-model.number="prix" type="number" required />

      <label>Ingrédients :</label>
      <div v-for="(ingredient, index) in ingredients" :key="index" class="ingredient-row">
        <select v-model="ingredient.nom">
          <option v-for="option in ingredientOptions" :key="option" :value="option">
            {{ option }}
          </option>
        </select>
        <input v-model="ingredient.quantite" type="text" placeholder="Quantité" required />
        <button type="button" @click="removeIngredient(index)" v-if="ingredients.length > 1">
          ❌
        </button>
      </div>
      <button type="button" @click="addIngredient">+ Ajouter un ingrédient</button>

      <button type="submit">{{ plat ? "Mettre à jour" : "Ajouter" }}</button>
    </form>
  </div>
</template>

<style scoped>
.plat-form {
  max-width: 400px;
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
.ingredient-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 5px;
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
</style>
