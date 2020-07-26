import axios from "axios";
import container from "@/services/container";
import { Logger } from "@/services/logger";

export interface Credentials {
  username: string;
  password: string;
}

export class UserService {
  async login(credentials: Credentials): Promise<string> {
    const response = await axios.post("/api/login", credentials);
    //todo real injections
    //eslint-disable-next-line
    //@ts-ignore
    (container.get("logger") as Logger).logInfo(
      "Login successful:",
      credentials.username
    );

    return response.data;
  }
}
