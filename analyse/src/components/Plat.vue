<script>
export default {
  name: "Plat",
  props: {
    plat: Object,
  },
  methods: {
    updatePlat() {
      this.$emit("update", this.plat);
    },
    deletePlat() {
      this.$emit("delete", this.plat.id);
    },
  },
};
</script>

<template>
  <div class="plat-card">
    <h2>{{ plat.nom }}</h2>
    <p><strong>Temps de cuisson:</strong> {{ plat.tempsCuisson }} min</p>
    <p><strong>Prix:</strong> {{ plat.prix }} Ariary</p>
    <p><strong>Ingrédients:</strong></p>
    <ul>
      <li v-for="(ingredient, index) in plat.ingredients" :key="index">
        {{ ingredient.nom }} - {{ ingredient.quantite }}
      </li>
    </ul>
    <button @click="updatePlat">Update</button>
    <button @click="deletePlat" class="delete">Delete</button>
  </div>
</template>

<style scoped>
.plat-card {
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 8px;
  background: #f9f9f9;
  margin-bottom: 10px;
}
button {
  margin: 5px;
  padding: 8px 12px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}
button:hover {
  opacity: 0.8;
}
.delete {
  background-color: #ff4d4d;
  color: white;
}
</style>