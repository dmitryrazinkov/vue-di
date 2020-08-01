import container from "@/services/container";
import { AxiosError } from "axios";
import { I18n } from "vue-i18n";

export class ErrorHandler {
  get i18n(): I18n {
    return container.get("i18n") as I18n;
  }

  handleError(e: AxiosError) {
    //todo some toast service here
    alert(
      this.i18n.global.t(`error.${e.response?.data.error || "COMMON_ERR"}`)
    );
  }
}
