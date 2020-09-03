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
import {AnotherErrorToaster, IErrorToaster} from "@/services/errorToaster";
import {ILogger, Logger} from "@/services/logger";
import serviceInjectionPlugin from "@/services/helpers/serviceInjectionPlugin";
import {ErrorHandler} from "@/services/errorHandler";
import InjectionToken from "tsyringe/dist/typings/providers/injection-token";
import {VueInjectedServices} from "@/services/helpers/serviceInjectionPluginTypes";
import errorHandlerPlugin from "@/plugins/errorHandlerPlugin";
import {ErrorHandlerNoDi, SimpleErrorToasterNoDi} from "@/whithout-di-examples/errorHandlerNoDi";

export const i18n = createI18n({
  locale: "en-US",
  messages
});

const app = createApp(App)
  .use(router)
  .use(store)
  .use(toasterAdapter)
  .use(
    serviceInjectionPlugin(
      new Map<string, InjectionToken<any>>([
        ["$logger", TYPES.ILogger],
        ["$errorHandler", ErrorHandler]
      ])
    )
  );

container.registerInstance(
  TYPES.VuePlugins,
  (app as any).config.globalProperties
);
container.registerInstance(TYPES.Router, router);
container.registerInstance(TYPES.i18n, i18n);
container.register<IErrorToaster>(TYPES.IErrorToaster, {
  useClass: AnotherErrorToaster
});
container.register<ILogger>(TYPES.ILogger, {
  useClass: Logger
});

app.use(i18n);

app.use(errorHandlerPlugin, {
  toaster: new SimpleErrorToasterNoDi(app.config.globalProperties.$toasted)
});

app.mount("#app");

export interface InstalledPlugins {
  $toasted: Toasted;
  $store: Store<any>;
  $router: Router;
  $errorHandlerPlugin: ErrorHandlerNoDi;
}

declare module "vue-class-component" {
  export type Vue = InstalledPlugins & VueInjectedServices;
}
