import {App} from "@vue/runtime-core";
import {ILogger} from "@/services/logger";

export default {
  install: <HostElement = any>(
    app: App<HostElement>,
    options: {
      loggerConstructor: new (...args: Array<any>) => ILogger;
      loggerConstructorArgs: any[];
    }
  ) => {
    app.config.globalProperties.$loggerPlugin = new options.loggerConstructor(
      ...options.loggerConstructorArgs
    );
  }
};
