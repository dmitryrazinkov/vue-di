import {ActionContext} from "vuex";
import {RootState} from "@/store/types";
import {Credentials, UserService} from "@/services/userService";
import {Logger} from "@/services/logger";
import {Router} from "vue-router";
import {ErrorHandler} from "@/services/errorHandler";
import {container} from "tsyringe";
import {TYPES} from "@/services/helpers/containerTypes";
import axios from "axios";
import {VueGlobalProperties} from "@/main";

export interface CommonState {
  token?: string;
}

const deps = {
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
        deps.errorHandler.handleBackendError(e);
      }
      deps.logger.logError(e);
      return;
    }
    commit("setToken", token);
    await deps.router.push({ name: "Home" });
  },

  logout: async ({ commit }: ActionContext<CommonState, RootState>) => {
    commit("setToken", undefined);
    await deps.router.push({ name: "Login" });
  }
};

// The following 3 constants are different approaches for passing plugins into Vuex.
// If Di is used you can remove them, otherwise choose one of them and remove others
const actionsNoDiViaPayload = {
  login: async (
    { commit, dispatch, state }: ActionContext<CommonState, RootState>,
    payload: {
      credentials: Credentials;
      errorHandler: ErrorHandler;
      logger: Logger;
    }
  ) => {
    let token: string;

    const { credentials, errorHandler, logger } = payload;

    try {
      token = (await axios.post("/api/login", credentials)).data;
      logger.logInfo("Login successful:", credentials.username);
    } catch (e) {
      if (e.response?.status === 401) {
        errorHandler.handleBackendError(e);
      }
      logger.logError(e);
      return;
    }
    commit("setToken", token);
    await deps.router.push({ name: "Home" });
  },

  logout: async (
    { commit }: ActionContext<CommonState, RootState>,
    payload: {
      router: Router;
    }
  ) => {
    commit("setToken", undefined);
    await payload.router.push({ name: "Login" });
  }
};

const actionsNoDiViaGlobalVariable = {
  login: async (
    { commit, dispatch, state }: ActionContext<CommonState, RootState>,
    credentials: Credentials
  ) => {
    let token: string;

    const {
      $errorHandlerPlugin: errorHandler,
      $loggerPlugin: logger
    } = VueGlobalProperties;

    try {
      token = (await axios.post("/api/login", credentials)).data;
      logger.logInfo("Login successful:", credentials.username);
    } catch (e) {
      if (e.response?.status === 401) {
        errorHandler.handleBackendError(e);
      }
      logger.logError(e);
      return;
    }
    commit("setToken", token);
    await deps.router.push({ name: "Home" });
  },

  logout: async ({ commit }: ActionContext<CommonState, RootState>) => {
    commit("setToken", undefined);
    await VueGlobalProperties.$router.push({ name: "Login" });
  }
};

const actionsNoDiViaGlobalState = {
  login: async (
    {
      commit,
      dispatch,
      state,
      rootState
    }: ActionContext<CommonState, RootState>,
    credentials: Credentials
  ) => {
    let token: string;

    const {
      $errorHandlerPlugin: errorHandler,
      $loggerPlugin: logger
    } = rootState.vueGlobalProperties!;

    try {
      token = (await axios.post("/api/login", credentials)).data;
      logger.logInfo("Login successful:", credentials.username);
    } catch (e) {
      if (e.response?.status === 401) {
        errorHandler.handleBackendError(e);
      }
      logger.logError(e);
      return;
    }
    commit("setToken", token);
    await deps.router.push({ name: "Home" });
  },

  logout: async ({
    commit,
    rootState
  }: ActionContext<CommonState, RootState>) => {
    commit("setToken", undefined);
    await rootState.vueGlobalProperties!.$router.push({ name: "Login" });
  }
};

export default {
  state,
  mutations,
  actions
};
