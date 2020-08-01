import router from "./router";
import store from "./store";
import { createApp } from "vue";
import App from "./App.vue";
import "./server-mock/serverMock";
import { createI18n } from "vue-i18n";
import { messages } from "@/lang";
import container from "@/services/container";

const i18n = createI18n({
  locale: "en-US",
  messages
});

const app = createApp(App)
  .use(router)
  .use(store);

//todo and put in container
app.use(i18n);
container.set("i18n", i18n);

app.mount("#app");
