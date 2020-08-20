import {ToastObject} from "vue-toasted";
import {inject, injectable} from "tsyringe";
import {TYPES} from "@/services/helpers/containerTypes";
import {Vue} from "vue-class-component";

export interface IErrorToaster {
    show(message: string): ToastObject;
}

@injectable()
export class SimpleErrorToaster implements IErrorToaster {

    constructor(@inject(TYPES.Vue) private Vue: Vue) {}

    show(message: string): ToastObject {
        return this.Vue.$toasted.show(message, {
            duration: 2000,
            position: "bottom-right"
        })
    }
}

@injectable()
export class AnotherErrorToaster implements IErrorToaster {

    constructor(@inject(TYPES.Vue) private Vue: Vue) {}

    show(message: string): ToastObject {
        return this.Vue.$toasted.show(message, {
            duration: 5000,
            position: "top-left"
        })
    }
}
