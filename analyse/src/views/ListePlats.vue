<script>
import PlatComponent from "./components/Plat.vue";
import HeaderComponent from "./components/Header.vue";

export default {
  name: "ListePlats",
  components: {
    PlatComponent,
    HeaderComponent,
  }, //eto no alaina ny plats
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
  <div>
    <HeaderComponent />
    <h1>Liste des plats</h1>
    <button @click="addPlat" class="add-button">+</button>
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
.plats-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.add-button {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 15px;
  font-size: 20px;
  cursor: pointer;
  border-radius: 50%;
  margin-bottom: 20px;
}
.add-button:hover {
  background-color: #45a049;
}
</style>
