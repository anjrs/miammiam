<template>
    <div class="form-container">
      <h2>{{ isEditing ? 'Modifier le plat' : 'Ajouter un plat' }}</h2>
      <form @submit.prevent="submitForm">
        <label for="nom">Nom du plat :</label>
        <input type="text" id="nom" v-model="plat.nom" required />
        
        <label for="tempsCuisson">Temps de cuisson (en secondes) :</label>
        <input type="number" id="tempsCuisson" v-model="plat.tempsCuisson" required />
        
        <label for="prix">Prix :</label>
        <input type="number" id="prix" v-model="plat.prix" required />
        
        <label>Ingrédients :</label>
        <div v-for="(ingredient, index) in plat.ingredients" :key="index" class="ingredient-row">
          <select v-model="ingredient.nom">
            <option v-for="ing in ingredientsOptions" :key="ing" :value="ing">{{ ing }}</option>
          </select>
          <input type="text" v-model="ingredient.quantite" placeholder="Quantité" required />
          <button type="button" @click="removeIngredient(index)">❌</button>
        </div>
        
        <button type="button" @click="addIngredient">+</button>
        <button type="submit">{{ isEditing ? 'Modifier' : 'Ajouter' }}</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        isEditing: false,
        plat: {
          nom: '',
          tempsCuisson: '',
          prix: '',
          ingredients: [{ nom: '', quantite: '' }],
        },
        ingredientsOptions: ['Tomate', 'Oignon', 'Poulet', 'Riz', 'Poivre'],
      };
    },
    methods: {
      addIngredient() {
        this.plat.ingredients.push({ nom: '', quantite: '' });
      },
      removeIngredient(index) {
        this.plat.ingredients.splice(index, 1);
      },
      submitForm() {
        console.log('Formulaire soumis', this.plat);
      },
    },
  };
  </script>
  
  <style scoped>
  .form-container {
    max-width: 400px;
    margin: auto;
    padding: 20px;
    background-color: #f8f8f8;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  input, select, button {
    display: block;
    width: 100%;
    margin-top: 10px;
    padding: 8px;
    font-size: 16px;
  }
  .ingredient-row {
    display: flex;
    gap: 10px;
  }
  </style>
  