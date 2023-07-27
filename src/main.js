// main.js -> mounts Application from App.vue
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router"; // Importiere den Router
import './app.css' 


const app = createApp(App);
app.use(router); // Füge den Router zur Hauptanwendung hinzu
app.mount("#app");


