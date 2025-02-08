<script>
export default {
  name: "Header",
};
</script>

<template>
  <nav>
    <ul>
      <li><a href="/stocks">Stocks</a></li>
      <li><a href="/plats">Plats</a></li>
      <li><a href="/historique">Historique</a></li>
      <li><a href="/statistique">Statistiques</a></li>
      <li><a href="/commandes">Commandes</a></li>
    </ul>
  </nav>
</template>

<style scoped>
nav {
  background-color: #f8f9fa;
  padding: 10px;
  border-bottom: 2px solid #ddd;
}

ul {
  list-style: none;
  display: flex;
  gap: 20px;
  padding: 0;
}

li {
  display: inline;
}

a {
  text-decoration: none;
  color: #333;
  font-weight: bold;
}

a:hover {
  color: #007bff;
}
</style>
