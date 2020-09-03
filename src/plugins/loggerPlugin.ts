import {App} from "@vue/runtime-core";
import {ToastOptions} from "vue-toasted";
import {Logger} from "@/services/logger";

export default {
  install: <HostElement = any>(
    app: App<HostElement>,
    options: ToastOptions
  ) => {
    app.config.globalProperties.$loggerPlugin = new Logger();
  }
};
