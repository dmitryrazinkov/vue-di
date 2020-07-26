//todo here we will have real container after integration with one of the exisitng solution
import { UserService } from "@/services/userService";
import { Logger, logToConsole } from "@/services/logger";
import { Router } from "vue-router";
import router from "@/router";

interface IContainer {
  user: UserService;
  logger: Logger;
  router: Router;
}

class Container {
  container: IContainer = {
    user: new UserService(),
    logger: new Logger(logToConsole),
    router: router
  };

  get(depName: keyof IContainer) {
    return this.container[depName];
  }

  set(depName: keyof IContainer, value: any) {
    this.container[depName] = value;
  }
}

const container = new Container();

if ((window as any).Cypress) {
  // we store container in window in order to allow mocking in tests
  (window as any).$container = container;
}

export default container;
