<script>
import axios from 'axios';
import Header from '../components/Header.vue';
import Commande from '../components/Commande.vue';

export default {
  name: "Clients",
  components: {
    Commande,
    Header,
  },
  data() {
    return {
      clients: [],
      commandes: [],
      orderItems: {},
      dishes: {}
    };
  },
  mounted() {
    this.fetchClientData();
  },
  methods: {
    async fetchClientData() {
      try {
        const clientsResponse = await axios.get("https://miammiam3-production.up.railway.app/api/users");
        const commandesResponse = await axios.get("https://miammiam3-production.up.railway.app/api/orders");
        const orderItemsResponse = await axios.get("https://miammiam3-production.up.railway.app/api/order_items");
        const dishesResponse = await axios.get("https://miammiam3-production.up.railway.app/api/dishes");

        this.clients = clientsResponse.data.member || [];
        this.commandes = commandesResponse.data.member || [];
        this.orderItems = orderItemsResponse.data.member.reduce((acc, item) => {
          if (!acc[item.commande]) {
            acc[item.commande] = [];
          }
          acc[item.commande].push(item);
          return acc;
        }, {});
        this.dishes = dishesResponse.data.member.reduce((acc, dish) => {
          acc[dish['@id']] = dish;
          return acc;
        }, {});
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
      }
    },
    getOrderItems(commande) {
      return this.orderItems[commande['@id']] || [];
    },
    getDishName(dishId) {
      return this.dishes[dishId]?.name || 'Plat inconnu';
    }
  }
};
</script>

<template>
  <div>
    <Header/>
    
    <h1>Liste des Clients</h1>
    <div class="clients-container">
      <div
        v-for="(client, index) in clients"
        :key="index"
        class="client-card"
      >
        <h2>Informations Client</h2>
        <p><strong>Nom:</strong> {{ client.name }}</p>
        <p><strong>Email:</strong> {{ client.email }}</p>
        <p><strong>Créé le:</strong> {{ client.createdAt }}</p>

        <h3>Commandes</h3>
        <div class="commandes-container">
          <div v-for="commande in commandes" :key="commande['@id']">
            <div v-if="client.ordersUser && client.ordersUser.includes(commande['@id'])">
              <Commande
                :user="client.name"
                :statut="commande.status"
                :date="commande.createdAt"
                :plat="getOrderItems(commande).map(item => getDishName(item.dish)).join(', ')"
                :quantite="getOrderItems(commande).reduce((total, item) => total + item.quantity, 0)"
              />
            </div>
          </div>
        </div>
      </div>
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

h2 {
  font-size: 20px;
  margin-bottom: 10px;
}

.client-card {
  background-color: #f4f4f4;
  padding: 20px;
  margin: 20px 0;
  border-radius: 8px;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
}

.clients-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 20px;
  padding: 20px;
}

.commandes-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 20px;
  padding: 20px;
}

.commande-card {
  flex: 1 1 calc(33.333% - 40px);
  box-sizing: border-box;
  max-width: 300px;
}
</style>
