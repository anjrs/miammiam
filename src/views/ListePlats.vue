<script>
import axios from "axios";
import Plat from "../components/Plat.vue";
import Header from "../components/Header.vue";

export default {
  name: "ListePlats",
  components: {
    Plat,
    Header,
  },
  data() {
    return {
      plats: [], // Initialement vide, les données seront chargées depuis l'API
    };
  },
  mounted() {
    this.fetchPlats(); // Charger les plats au chargement du composant
  },
  methods: {
    async fetchPlats() {
      try {
        const response = await axios.get("https://miammiam3-production.up.railway.app/api/dishes");
        this.plats = response.data.member; // Récupère la vraie liste des plats
      } catch (error) {
        console.error("Erreur lors du chargement des plats :", error);
      }
    },
    createPlat() {
      this.$router.push("/create-plat"); // Redirige vers la page de création de plat
    },
    updatePlat(plat) {
      this.$router.push({ name: "Update_Plat", params: { id: plat.id } });
    },
  },
};
</script>

<template>
  <div>
    <Header />
    <h1>Liste des plats</h1>
    <button @click="createPlat" class="add-button">Ajouter Plat</button>
    <div class="plats-container">
      <Plat
        v-for="plat in plats"
        :key="plat['@id']"
        :plat="plat"
      />
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

h1 {
  text-align: center;
  color: #333;
  font-size: 24px;
  margin-bottom: 20px;
}

.add-button {
  display: block;
  margin: 0 auto 20px;
  padding: 10px 20px;
  background-color: #a3d2ca;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
}

.add-button:hover {
  background-color: #5eaaa8;
}

.plats-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 20px;
  padding: 20px;
}

.plat-card {
  flex: 1 1 calc(33.333% - 40px);
  box-sizing: border-box;
  max-width: 300px;
}
</style>