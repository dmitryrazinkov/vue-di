import {Logger} from "@/services/logger";
import {ErrorHandler} from "@/services/errorHandler";

export interface VueInjectedServices {
  $logger: Logger;
  $errorHandler: ErrorHandler;
}
