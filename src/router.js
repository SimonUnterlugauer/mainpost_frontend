// router.js
import { createRouter, createWebHistory } from "vue-router";
import EmployeeList from "./components/Employees/index/EmployeeList.vue";
import EmployeeDetail from "./components/Employees/show/EmployeeDetail.vue";
import LoginComponent from "./components/Authentification/Login/LoginComponent.vue";


const routes = [
  { path: "/employees", component: EmployeeList },
  { path: "/employee/:id", component: EmployeeDetail },
  { path: "/login", component: LoginComponent },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
  });
  
  export default router;
