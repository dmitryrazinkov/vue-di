//todo here we will have real container after integration with one of the exisitng solution
import {UserService} from "@/services/userService";
import {Logger} from "@/services/logger";
import {Router} from "vue-router";
import {I18n} from "vue-i18n";
import {ErrorHandler} from "@/services/errorHandler";

interface IContainer {
  user: UserService;
  logger: Logger;
  router: Router;
  i18n?: I18n;
  errorHandler: ErrorHandler;
}

// class Container {
//   container: IContainer = {
//     user: new UserService(),
//     logger: new Logger(logToConsole),
//     router: router,
//     errorHandler: new ErrorHandler()
//   };
//
//   get(depName: keyof IContainer) {
//     return this.container[depName];
//   }
//
//   set(depName: keyof IContainer, value: any) {
//     this.container[depName] = value;
//   }
// }
//
// const mockContainer = new Container();
//
// if ((window as any).Cypress) {
//   // we store container in window in order to allow mocking in tests
//   (window as any).$container = mockContainer;
// }

const mockContainer = {};
export default mockContainer;
