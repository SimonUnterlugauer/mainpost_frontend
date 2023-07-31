// router.js -> zentrale routing file
import { createRouter, createWebHistory } from "vue-router";
import EmployeeList from "./components/Views/Employees/index/EmployeeList.vue";
import EmployeeDetail from "./components/Views/Employees/show/EmployeeDetail.vue";
import LoginComponent from "./components/Authentification/Login/LoginComponent.vue";
import DashboardComponent from "./components/Views/Dashboard/DashboardComponent.vue";
import MonthlyAbsences from "./components/Views/Absences/MonthlyAbsences";

const routes = [
  { path: "/employees", component: EmployeeList },
  { path: "/employee/:id", component: EmployeeDetail },
  { path: "/login", component: LoginComponent },
  { path: "/dashboard", component: DashboardComponent },
  { path: "/absences", 
    name: "MonthlyAbsences", 
    component: MonthlyAbsences,
    props: true,
    meta: { title: "Data list" }, },
  { path: "/", component: DashboardComponent },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
  });
  
  export default router;
