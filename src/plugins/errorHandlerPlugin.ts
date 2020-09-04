import {App} from "@vue/runtime-core";
import {ErrorHandlerNoDi} from "@/whithout-di-examples/errorHandlerNoDi";
import {i18n} from "@/main";
import {IErrorToaster} from "@/services/errorToaster";

export default {
  install: <HostElement = any>(
    app: App<HostElement>,
    options: { toaster: IErrorToaster }
  ) => {
    app.config.globalProperties.$errorHandlerPlugin = new ErrorHandlerNoDi(
      options.toaster,
      i18n
    );
  }
};
