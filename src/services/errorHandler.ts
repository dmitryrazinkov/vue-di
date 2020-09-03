import {AxiosError} from "axios";
import {I18n} from "vue-i18n";
import {inject, singleton} from "tsyringe";
import {TYPES} from "@/services/helpers/containerTypes";
import {IErrorToaster} from "@/services/errorToaster";

@singleton()
export class ErrorHandler {
  constructor(
    @inject(TYPES.i18n) private i18n: I18n,
    @inject(TYPES.IErrorToaster) private errorToaster: IErrorToaster
  ) {}

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
