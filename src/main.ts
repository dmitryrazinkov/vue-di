import router from "./router";
import store from "./store";
import { createApp } from "vue";
import App from "./App.vue";
import { Logger, logToConsole } from "@/services/logger";

//todo logger that will be used as an example
const logger = new Logger(logToConsole);
logger.logInfo("Info test message");
logger.logWarn("Warn test message");
logger.logError("Error test message");

const app = createApp(App)
  .use(router)
  .use(store);

app.mount("#app");
