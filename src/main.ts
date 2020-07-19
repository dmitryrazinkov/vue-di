import router from "./router";
import store from "./store";
import { createApp } from "vue";
import App from "./App.vue";
import { Logger, logToConsole } from "@/services/logger";

//todo logger that will be used as an example
const logger = new Logger(logToConsole);

const app = createApp(App)
  .use(router)
  .use(store);

app.mount("#app");
