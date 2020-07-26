import router from "./router";
import store from "./store";
import { createApp } from "vue";
import App from "./App.vue";
import "./server-mock/serverMock";

const app = createApp(App)
  .use(router)
  .use(store);

app.mount("#app");
