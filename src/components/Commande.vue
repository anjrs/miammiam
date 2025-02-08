<script>
export default {
  name: 'Commande',
  props: {
    user: String,
    statut: String,
    date: String,
    plat: String,
    quantite: Number
  }
}
</script>

<template>
  <div class="commande-card">
    <p><strong>Utilisateur:</strong> {{ user }}</p>
    <p><strong>Statut:</strong> {{ statut }}</p>
    <p><strong>Date:</strong> {{ new Date(date).toLocaleDateString() }}</p>
    <p><strong>Plat:</strong> {{ plat }}</p>
    <p><strong>Quantité:</strong> {{ quantite }}</p>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

.commande-card {
  border: 1px solid #ddd;
  padding: 20px;
  border-radius: 8px;
  background: #f9f9f9;
  margin-bottom: 20px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  font-family: 'Roboto', sans-serif;
  max-width: 600px;
  margin: 20px auto;
}

p {
  margin: 10px 0;
  color: #555;
}

strong {
  color: #333;
}
</style>