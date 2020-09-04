import "reflect-metadata";

import router from "./router";
import store from "./store";
import {createApp} from "vue";
import App from "./App.vue";
import "./server-mock/serverMock";
import {TYPES} from "@/services/helpers/containerTypes";
import {Toasted} from "vue-toasted";
import toasterAdapter from "@/plugins/toasterAdapter";
import {Store} from "vuex";
import {Router} from "vue-router";
import {ILogger, Logger, logToConsole} from "@/services/logger";
import serviceInjectionPlugin from "@/services/helpers/serviceInjectionPlugin";
import {ErrorHandler} from "@/services/errorHandler";
import InjectionToken from "tsyringe/dist/typings/providers/injection-token";
import {VueInjectedServices} from "@/services/helpers/serviceInjectionPluginTypes";
import errorHandlerPlugin from "@/plugins/errorHandlerPlugin";
import {ErrorHandlerNoDi, SimpleErrorToasterNoDi} from "@/whithout-di-examples/errorHandlerNoDi";
import loggerPlugin from "@/plugins/loggerPlugin";
import i18n from "@/lang/i18n";
import {initContainer} from "@/services/helpers/containerInitialization";

// Step 1: Creation of Vue application
const app = createApp(App);

// Step 2: Initialization of DI Container
initContainer(app);

// Step 3: Installing required plugins
app
  .use(router)
  .use(store)
  .use(toasterAdapter)
  // Injection DI Services into Vue as plugins (this part can be removed if decorative approach is preferable for you)
  .use(
    serviceInjectionPlugin(
      new Map<string, InjectionToken<any>>([
        ["$logger", TYPES.ILogger],
        ["$errorHandler", ErrorHandler]
      ])
    )
  )
  .use(i18n);

// Step 4: Register our installed plugins in Vue Type
export interface InstalledPlugins {
  $toasted: Toasted;
  $store: Store<any>;
  $router: Router;
}

declare module "vue-class-component" {
  export type Vue = InstalledPlugins & VueInjectedServices;
}

// Optional examples if DI is absent

app
  // Example of passing dependencies to plugin
  .use(errorHandlerPlugin, {
    toaster: new SimpleErrorToasterNoDi(app.config.globalProperties.$toasted)
  })
  // Example of passing dependencies to plugin
  .use(loggerPlugin, {
    loggerConstructor: Logger,
    loggerConstructorArgs: [
      logToConsole,
      (args: Array<any>) => {
        return `Number of logged arguments: ${args.length}`;
      }
    ]
  });

// Append plugin interface to add them into Vue Type
export interface InstalledPlugins {
  $errorHandlerPlugin: ErrorHandlerNoDi;
  $loggerPlugin: ILogger;
}

// Exposing plugins as global variable
export const VueGlobalProperties = app.config.globalProperties;

// Exposing plugins
store.state.vueGlobalProperties = app.config.globalProperties;

// Step 6: Mount Vue Application
app.mount("#app");
