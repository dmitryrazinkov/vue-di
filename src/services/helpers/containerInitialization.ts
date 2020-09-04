import {App} from "@vue/runtime-core";
import {container} from "tsyringe";
import {TYPES} from "@/services/helpers/containerTypes";
import router from "@/router";
import i18n from "@/lang/i18n";
import {AnotherErrorToaster, IErrorToaster} from "@/services/errorToaster";
import {ILogger, Logger} from "@/services/logger";

/**
 * Initial setup of DI Container
 * @param app instance of Vue Application
 */
export function initContainer<HostElement>(app: App<HostElement>) {
  // Register Vue Plugins in DI Container
  container.registerInstance(TYPES.VuePlugins, app.config.globalProperties);

  container.registerInstance(TYPES.Router, router);
  container.registerInstance(TYPES.i18n, i18n);
  container.register<IErrorToaster>(TYPES.IErrorToaster, {
    useClass: AnotherErrorToaster
  });
  container.register<ILogger>(TYPES.ILogger, {
    useClass: Logger
  });
}
