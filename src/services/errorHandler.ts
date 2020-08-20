import {AxiosError} from "axios";
import {I18n} from "vue-i18n";
import {inject, injectable} from "tsyringe";
import {TYPES} from "@/services/helpers/containerTypes";
import {IErrorToaster} from "@/services/ErrorToaster";

@injectable()
export class ErrorHandler {
  constructor(@inject(TYPES.i18n) private i18n: I18n, @inject(TYPES.IErrorToaster) private errorToaster: IErrorToaster) {
  }

  handleError(e: AxiosError) {
    this.errorToaster.show(this.i18n.global.t(`error.${e.response?.data.error || "COMMON_ERR"}`));
  }
}
