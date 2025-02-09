<script>
export default {
  name: "Header",
};
</script>

<template>
  <nav>
    <ul>
      <li><router-link to="/stocks">Stocks</router-link></li>
      <li><router-link to="/plats">Liste des plats</router-link></li>
      <li><router-link to="/statistique">Statistiques</router-link></li>
      <li><router-link to="/clients">Clients</router-link></li>
      <li><router-link to="/historique">Historique des commandes</router-link></li>
      <li><router-link to="/cooking">Commandes en cours</router-link></li>

    </ul>
  </nav>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

nav {
  background-color: #a3d2ca;
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 20px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  font-family: 'Roboto', sans-serif;
}

ul {
  list-style: none;
  display: flex;
  justify-content: space-around;
  padding: 0;
  margin: 0;
}

li {
  margin: 0 10px;
}

a {
  text-decoration: none;
  color: white;
  font-weight: bold;
  font-size: 16px;
}

a:hover {
  color: #5eaaa8;
}
</style>