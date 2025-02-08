<script>
import axios from 'axios';
import Header from '../components/Header.vue';
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

export default {
  name: "Statistique",
  components: {
    Header,
    Bar
  },
  data() {
    return {
      commandes: [],
      totalVentes: 0,
      totalPlats: 0,
      totalCommandesPaid: 0,
      selectedYear: new Date().getFullYear(),
      monthlyData: Array(12).fill(0)
    };
  },
  mounted() {
    this.fetchCommandes();
  },
  methods: {
    async fetchCommandes() {
      try {
        const commandesResponse = await axios.get("https://miammiam3-production.up.railway.app/api/orders");
        const orderItemsResponse = await axios.get("https://miammiam3-production.up.railway.app/api/order_items");

        this.commandes = commandesResponse.data.member;
        const orderItems = orderItemsResponse.data.member;

        this.totalVentes = this.commandes
          .filter(commande => commande.status === 'paid')
          .reduce((total, commande) => total + parseFloat(commande.totalAmount), 0);

        this.totalCommandesPaid = this.commandes.filter(commande => commande.status === 'paid').length;

        this.totalPlats = orderItems.reduce((total, item) => total + item.quantity, 0);

        this.updateMonthlyData();
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
      }
    },
    updateMonthlyData() {
      const monthlyData = Array(12).fill(0);
      this.commandes.forEach(commande => {
        const date = new Date(commande.createdAt);
        if (date.getFullYear() === this.selectedYear) {
          const month = date.getMonth();
          const orderItems = this.getOrderItems(commande);
          monthlyData[month] += orderItems.reduce((total, item) => total + item.quantity, 0);
        }
      });
      this.monthlyData = monthlyData;
    },
    getOrderItems(commande) {
      return this.orderItems[commande['@id']] || [];
    }
  },
  watch: {
    selectedYear() {
      this.updateMonthlyData();
    }
  }
};
</script>

<template>
  <div>
    <Header/>
    <h1>Statistiques des ventes</h1>
    <div class="statistiques-container">
      <p>Total des ventes : {{ totalVentes.toFixed(2) }} Ar</p>
      <p>Nombre de commandes payées : {{ totalCommandesPaid }}</p>
      <p>Nombre total de plats vendus/servis : {{ totalPlats }}</p>
      <label for="year-select">Choisir une année :</label>
      <select id="year-select" v-model="selectedYear">
        <option v-for="year in [2023, 2024, 2025]" :key="year" :value="year">{{ year }}</option>
      </select>
      <Bar :data="{
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
          label: 'Nombre de plats servis',
          backgroundColor: '#42A5F5',
          data: monthlyData
        }]
      }"/>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

.statistiques-container {
  max-width: 800px;
  margin: 50px auto;
  padding: 30px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background: #f9f9f9;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  font-family: 'Roboto', sans-serif;
}

h1 {
  text-align: center;
  color: #333;
  font-size: 24px;
  margin-bottom: 20px;
}

p {
  font-style: italic;
  color: #555;
  margin-bottom: 20px;
  text-align: center;
}

label {
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
  color: #444;
}

select {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  box-sizing: border-box;
}

canvas {
  max-width: 100%;
}
</style>