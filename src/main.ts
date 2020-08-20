import "reflect-metadata";

import router from "./router";
import store from "./store";
import {createApp} from "vue";
import App from "./App.vue";
import "./server-mock/serverMock";
import {createI18n} from "vue-i18n";
import {messages} from "@/lang";
import {container} from "tsyringe";
import {TYPES} from "@/services/helpers/containerTypes";
import {Toasted} from "vue-toasted";
import toasterAdapter from "@/plugins/toasterAdapter";
import {Store} from "vuex";
import {Router} from "vue-router";
import {AnotherErrorToaster, IErrorToaster} from "@/services/ErrorToaster";
import {ILogger, Logger} from "@/services/logger";

const i18n = createI18n({
  locale: "en-US",
  messages
});

const app = createApp(App)
  .use(router)
  .use(store)
  .use(toasterAdapter);

container.registerInstance(TYPES.Router, router);
container.registerInstance(TYPES.i18n, i18n);
container.register<IErrorToaster>(TYPES.IErrorToaster, {
  useClass: AnotherErrorToaster
});
container.register<ILogger>(TYPES.ILogger, {
  useClass: Logger
});

//todo and put in container
app.use(i18n);
// mockContainer.set("i18n", i18n);

app.mount("#app");


declare module "vue-class-component" {
  interface Vue {
    $toasted: Toasted;
    $store: Store<any>;
    $router: Router;
  }
}
