import {Vue} from "vue-class-component";
import ToastedPlugin, {Toasted, ToastOptions} from "vue-toasted";

export default {
    install: (app: any, options: ToastOptions) => {
        const Obj = class {};
        (Obj as any).component = app.component;
        ToastedPlugin.install(Obj, options);

        app.config.globalProperties.$toasted = (Obj as any).prototype.$toasted;
    }
}

declare module "vue-class-component" {
    interface Vue {
        $toasted: Toasted;
    }
}
