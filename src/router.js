import { createRouter, createWebHistory } from "vue-router";
import HomePage from "./pages/HomePage.vue";
import PizzasPage from "./pages/PizzasPage.vue";
import SinglePizzasPage from "./pages/SinglePizzasPage.vue";

// il lazy loading significa che il componente viene caricato solo quando serve e occorre togliere l'import sopra
//component: () => import('./pages/PizzasPage.vue')

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomePage,
    },
    {
      path: "/pizzas",
      name: "pizzas",
      component: PizzasPage,
    },
    {
      path: "/pizzas/:slug",
      name: "single-project",
      component: SinglePizzasPage,
    },
    // {
    //   path: "/about",
    //   name: "about",
    //   component: AboutPage,
    // },
    // {
    //   path: "/contact",
    //   name: "contact",
    //   component: ContactPage,
    // },
    //not found viene inserito sempre per ultimo
    // {
    //   path: "/:pathMatch(.*)*",
    //   name: "not-found",
    //   component: NotFound,
    // },
  ],
});

export { router };
