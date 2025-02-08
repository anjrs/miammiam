<script>
import PlatComponent from "./components/Plat.vue";
import HeaderComponent from "./components/Header.vue";

export default {
  name: "ListePlats",
  components: {
    PlatComponent,
    HeaderComponent,
  },
  data() {
    return {
      plats: [
        {
          id: 1,
          nom: "Riz cantonais",
          tempsCuisson: 15,
          prix: 12000,
          ingredients: [
            { nom: "Riz", quantite: "200g" },
            { nom: "Oeuf", quantite: "2" },
          ],
        },
        {
          id: 2,
          nom: "Poulet au curry",
          tempsCuisson: 30,
          prix: 15000,
          ingredients: [
            { nom: "Poulet", quantite: "250g" },
            { nom: "Curry", quantite: "10g" },
          ],
        },
      ],
    };
  },
  methods: {
    addPlat() {
      this.$router.push("/ajouter-plat");
    },
    updatePlat(plat) {
      console.log("Mise à jour du plat", plat);
    },
    deletePlat(platId) {
      this.plats = this.plats.filter((plat) => plat.id !== platId);
    },
  },
};
</script>

<template>
  <div class="container">
    <HeaderComponent />
    <h1>🌿 Liste des plats 🍽️</h1>
    <button @click="addPlat" class="add-button">Ajouter un plat</button>
    <div class="plats-container">
      <PlatComponent
        v-for="plat in plats"
        :key="plat.id"
        :plat="plat"
        @update="updatePlat"
        @delete="deletePlat"
      />
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 2000px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f8f9fa; /* Fond clair */
  border-radius: 12px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  color: #4a4e69;
  font-weight: bold;
  font-size: 24px;
  margin-bottom: 20px;
}

.plats-container {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.add-button {
  display: block;
  margin: 15px auto;
  background-color: #ffb6c1; /* Rose pastel */
  color: #fff;
  border: none;
  padding: 12px 18px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  border-radius: 25px;
  transition: background-color 0.3s ease-in-out;
}

.add-button:hover {
  background-color: #ff8fa3; /* Rose un peu plus foncé au hover */
}
</style>
