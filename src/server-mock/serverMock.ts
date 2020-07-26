import { Model, Server } from "miragejs";
import { Credentials } from "@/services/userService";
/*eslint-disable*/
new Server({
    models: {
        user: Model,
    },

    seeds(server) {
        server.create<string, any, any>("user", { username: "dmitry", password: "dmitry", token: null })
        server.create<string, any, any>("user", { username: "dmitry", password: "nikita", token: null })
    },

    routes() {
        this.namespace = "api";

        // @ts-ignore
        this.post("/login", (schema, request) => {
            const attrs: Credentials = JSON.parse(request.requestBody);
            // @ts-ignore
            const user = schema.users.findBy({username: attrs.username, password: attrs.password});

            user.attrs.token = "str" + new Date().getTime();

            return user.attrs.token;
        }, {timing: 100})
    }
})
/*eslint-enable*/
