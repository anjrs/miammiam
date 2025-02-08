<script>
import axios from 'axios';
import Header from '../components/Header.vue';
import Commande from '../components/Commande.vue';

export default {
  name: "ListeCommande",
  components: {
    Commande,
    Header,
  },
  data() {
    return {
      commandes: [],
      users: {},
      orderItems: {},
      dishes: {}
    };
  },
  mounted() {
    this.fetchCommandes();
  },
  methods: {
    async fetchCommandes() {
      try {
        const commandesResponse = await axios.get("https://miammiam3-production.up.railway.app/api/orders");
        const usersResponse = await axios.get("https://miammiam3-production.up.railway.app/api/users");
        const orderItemsResponse = await axios.get("https://miammiam3-production.up.railway.app/api/order_items");
        const dishesResponse = await axios.get("https://miammiam3-production.up.railway.app/api/dishes");

        this.commandes = commandesResponse.data.member;
        this.users = usersResponse.data.member.reduce((acc, user) => {
          acc[user['@id']] = user;
          return acc;
        }, {});
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
    getUser(commande) {
      return this.users[commande.utilisateur]?.name || 'Inconnu';
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

    <h1>Liste des commandes</h1>
    <div class="commandes-container">
      <Commande
        v-for="(commande, index) in commandes"
        :key="index"
        :user="getUser(commande)"
        :statut="commande.status"
        :date="commande.createdAt"
        :plat="getOrderItems(commande).map(item => getDishName(item.dish)).join(', ')"
        :quantite="getOrderItems(commande).reduce((total, item) => total + item.quantity, 0)"
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