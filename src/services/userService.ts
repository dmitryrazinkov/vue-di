import axios from "axios";

export interface Credentials {
  username: string;
  password: string;
}

export class UserService {
  async login(credentials: Credentials): Promise<string> {
    const response = await axios.post("/api/login", credentials);

    return response.data;
  }
}
