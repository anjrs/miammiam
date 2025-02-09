import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import ListePlats from "../views/ListePlats.vue";
import Clients from "../views/Clients.vue";
import Update_Plat from "../views/Update_plat.vue";
import Create_Plat from "../views/Create_Plat.vue";
import Statistique from "../views/Statistique.vue";
import Stocks from "../views/Stocks.vue";
import Historique from "../views/Historique.vue";
import Cooking from "../views/Cooking.vue";


const routes = [
  { path: "/", name: "Login", component: Login }, // Page d'accueil = Login
  { path: "/plats", name: "ListePlats", component: ListePlats },
  { path: "/clients", name: "Clients", component: Clients },
  { path: "/historique", name: "Historique", component: Historique},
  { path: "/cooking", name: "Cooking", component: Cooking},

  { path: "/statistique", name: "Statistique", component: Statistique },
  { path: "/stocks", name: "Stocks", component: Stocks },
  { path: "/create-plat", name: "Create_Plat", component: Create_Plat },
  { path: "/update-plat/:id", name: "Update_Plat", component: Update_Plat, props: true },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
