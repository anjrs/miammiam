<script>
export default {
  name: "StockIngredients",
  data() {
    return {
      ingredients: [
        { nom: "Riz", quantite: "5 kg" },
        { nom: "Poulet", quantite: "2 kg" },
        { nom: "Oeuf", quantite: "12 unités" },
        { nom: "Curry", quantite: "500 g" },
      ],
    };
  },
};
</script>

<template>
  <div>
    <h1>Stock des ingrédients</h1>
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
          <td>{{ ingredient.quantite }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}
th, td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: left;
}
th {
  background-color: #f4f4f4;
}
h1 {
  text-align: center;
  color: #333;
}
</style>
