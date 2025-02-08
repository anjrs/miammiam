import { createRouter, createWebHistory } from "vue-router";
import ListePlats from "@/views/ListePlats.vue";
// import AjouterPlat from "@/views/AjouterPlat.vue";

const routes = [
  { path: "/", name: "ListePlats", component: ListePlats },
//   { path: "/ajouter-plat", name: "AjouterPlat", component: AjouterPlat },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
