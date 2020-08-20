import {ActionContext} from "vuex";
import {RootState} from "@/store/types";
import {Credentials, UserService} from "@/services/userService";
import {Logger} from "@/services/logger";
import {Router} from "vue-router";
import {ErrorHandler} from "@/services/errorHandler";
import {container} from "tsyringe";
import {TYPES} from "@/services/helpers/containerTypes";

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
  get userService() {
    return container.resolve(UserService);
  },
  get router() {
    return container.resolve<Router>(TYPES.Router);
  },
  get logger() {
    return container.resolve(Logger);
  },
  get errorHandler() {
    return container.resolve(ErrorHandler);
  }
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
      deps.logger.logError(e);
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
