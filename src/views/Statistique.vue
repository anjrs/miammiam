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
      orderItems: [],
      totalVentes: 0,
      totalPlats: 0,
      totalCommandesPaid: 0,
      filteredDataChart: {
        labels: ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sept", "Oct", "Nov", "Déc"],
        datasets: [{
          label: 'Nombre de plats servis',
          backgroundColor: '#42A5F5',
          data: new Array(12).fill(0)
        }]
      }
    };
  },
  mounted() {
    this.fetchCommandes();
  },
  methods: {
    async fetchCommandes() {
      try {
        console.log("Chargement des données...");
        const [commandesResponse, orderItemsResponse] = await Promise.all([
          axios.get("https://miammiam3-production.up.railway.app/api/orders"),
          axios.get("https://miammiam3-production.up.railway.app/api/order_items")
        ]);

        this.commandes = commandesResponse.data.member || [];
        this.orderItems = orderItemsResponse.data.member || [];

        console.log("Commandes récupérées :", this.commandes.length);
        console.log("Détails de commandes récupérés :", this.orderItems.length);

        this.totalVentes = this.commandes
          .filter(commande => commande.status === 'paid')
          .reduce((total, commande) => total + parseFloat(commande.totalAmount || 0), 0);

        this.totalCommandesPaid = this.commandes.filter(commande => commande.status === 'paid').length;

        this.totalPlats = this.orderItems.reduce((total, item) => total + (item.quantity || 0), 0);

        this.filterData();
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error.response || error);
      }
    },
    filterData() {
      const monthlyData = new Array(12).fill(0);

      this.commandes.forEach(commande => {
        if (commande.status === 'paid' && commande.createdAt) {
          const date = new Date(commande.createdAt);
          if (!isNaN(date.getTime()) && date.getFullYear() === 2025) {
            const monthIndex = date.getMonth();
            monthlyData[monthIndex] += this.getOrderItems(commande).reduce((total, item) => total + (item.quantity || 0), 0);
          }
        }
      });

      this.filteredDataChart.datasets[0].data = monthlyData;
    },
    getOrderItems(commande) {
  return this.orderItems.filter(item => {
    const itemCommandeId = parseInt(item.commande.split("/").pop(), 10); // Extrait l'ID de la chaîne
    return itemCommandeId === commande.id;
  }) || [];
  console.log("Commande ID:", commande.id);
console.log("Items trouvés:", this.getOrderItems(commande));

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
      
      <!-- <Bar :data="filteredDataChart" /> -->
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

canvas {
  max-width: 100%;
}
</style>
