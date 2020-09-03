import {Toasted} from "vue-toasted";
import {AxiosError} from "axios";
import {I18n} from "vue-i18n";
import {IErrorToaster} from "@/services/errorToaster";

export class SimpleErrorToasterNoDi implements IErrorToaster {
  constructor(private toasted: Toasted) {}

  show(message: string): void {
    this.toasted.show(message, {
      duration: 2000,
      position: "bottom-right"
    });
  }
}
export class AnotherErrorToasterNoDi implements IErrorToaster {
  show(message: string): void {
    alert(message);
  }
}

export class ErrorHandlerNoDi {
  constructor(private errorToaster: IErrorToaster, private i18n: I18n) {}

  handleError(e: Error) {
    this.errorToaster.show(
      this.i18n.global.t(`error.${e.message || "COMMON_ERR"}`, e.message)
    );
  }

  handleBackendError(e: AxiosError) {
    this.errorToaster.show(
      this.i18n.global.t(`error.${e.response?.data.error || "COMMON_ERR"}`)
    );
  }
}
