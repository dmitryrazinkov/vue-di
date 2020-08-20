import {container} from "tsyringe";
import InjectionToken from "tsyringe/dist/typings/providers/injection-token";

export const ComponentInject = <T>(identifier?: InjectionToken<T>) => (
    proto: any,
    key: string
) => {
    let Type: any;

    if (
        typeof Reflect !== "undefined" &&
        typeof Reflect.getMetadata === "function"
    ) {
        Type = Reflect.getMetadata("design:type", proto, key);
    }

    Object.defineProperty(proto, key, {
        get() {
            return container.resolve(identifier || Type);
        }
    });
};
