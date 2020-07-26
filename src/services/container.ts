//todo here we will have real container after integration with one of the exisitng solution
import { UserService } from "@/services/userService";

interface IContainer {
  dep: string;
  user?: UserService;
}

class Container {
  container: IContainer = {
    dep: "1.2.3"
  };

  get(depName: keyof IContainer) {
    return this.container[depName];
  }

  set(depName: keyof IContainer, value: any) {
    this.container[depName] = value;
  }
}

const container = new Container();

container.set("user", new UserService());

if ((window as any).Cypress) {
  // we store container in window in order to allow mocking in tests
  (window as any).$container = container;
}

export default container;
