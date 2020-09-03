import {inject, injectable} from "tsyringe";
import {TYPES} from "@/services/helpers/containerTypes";
import {InstalledPlugins} from "@/main";

export interface IErrorToaster {
  show(message: string): void;
}

@injectable()
export class SimpleErrorToaster implements IErrorToaster {
  constructor(@inject(TYPES.VuePlugins) private vuePlugins: InstalledPlugins) {}

  show(message: string): void {
    this.vuePlugins.$toasted.show(message, {
      duration: 2000,
      position: "bottom-right"
    });
  }
}

@injectable()
export class AnotherErrorToaster implements IErrorToaster {
  constructor(@inject(TYPES.VuePlugins) private vuePlugins: InstalledPlugins) {}

  show(message: string): void {
    alert(message);
  }
}
