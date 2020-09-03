import {App} from "@vue/runtime-core";
import {ErrorHandlerNoDi} from "@/whithout-di-examples/errorHandlerNoDi";
import {i18n} from "@/main";
import {IErrorToaster} from "@/services/errorToaster";

export default {
  install: <HostElement = any>(
    app: App<HostElement>,
    options: { toaster: IErrorToaster }
  ) => {
    // // We need to wrap toasted plugin with proxy to avoid problems with plugins installation sequence
    // const toastedPlugin: Toasted = new Proxy<Toasted>({} as any, {
    //     get(target: Toasted, p: PropertyKey, receiver: any): any {
    //         if (!app.config.globalProperties.$toasted[p]) {
    //             throw new Error("Toasted plugin was not installed!")
    //         }
    //         return app.config.globalProperties.$toasted[p]
    //     }
    // });

    app.config.globalProperties.$errorHandlerPlugin = new ErrorHandlerNoDi(
      options.toaster,
      i18n
    );
  }
};
