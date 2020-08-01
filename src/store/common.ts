import { ActionContext } from "vuex";
import { RootState } from "@/store/types";
import { Credentials, UserService } from "@/services/userService";
import container from "@/services/container";
import { Logger } from "@/services/logger";
import { Router } from "vue-router";
import { ErrorHandler } from "@/services/errorHandler";

export interface CommonState {
  token?: string;
}

//todo use real container
const deps: {
  userService: UserService;
  logger: Logger;
  router: Router;
  errorHandler: ErrorHandler;
} = {
  //eslint-disable-next-line
    // @ts-ignore
  userService: container.get("user"),
  //eslint-disable-next-line
  //@ts-ignore
  router: container.get("router"),
  //eslint-disable-next-line
  //@ts-ignore
  logger: container.get("logger"),
  //eslint-disable-next-line
  //@ts-ignore
  errorHandler: container.get("errorHandler")
};

const state = {
  token: localStorage.getItem("token")
};

const mutations = {
  setToken(state: CommonState, token: string | undefined) {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
    state.token = token;
  }
};

const actions = {
  login: async (
    { commit, dispatch, state }: ActionContext<CommonState, RootState>,
    payload: Credentials
  ) => {
    let token: string;
    try {
      token = await deps.userService.login(payload);
    } catch (e) {
      if (e.response?.status === 401) {
        deps.errorHandler.handleError(e);
      }
      return;
    }
    commit("setToken", token);
    await deps.router.push({ name: "Home" });
  },

  logout: async ({
    commit,
    dispatch,
    state
  }: ActionContext<CommonState, RootState>) => {
    commit("setToken", undefined);
    await deps.router.push({ name: "Login" });
  }
};

export default {
  state,
  mutations,
  actions
};
