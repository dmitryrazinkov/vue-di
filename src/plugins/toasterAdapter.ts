import ToastedPlugin, {ToastOptions} from "vue-toasted";
import {App} from "@vue/runtime-core";

export default {
  install: <HostElement = any>(
    app: App<HostElement>,
    options: ToastOptions
  ) => {
    const Obj = class {};
    (Obj as any).component = app.component;
    ToastedPlugin.install(Obj, options);

    app.config.globalProperties.$toasted = (Obj as any).prototype.$toasted;
  }
};
