import { ActionContext } from "vuex";
import { RootState } from "@/store/types";
import { Credentials, UserService } from "@/services/userService";
import container from "@/services/container";
import { Logger } from "@/services/logger";
import { Router } from "vue-router";

export interface CommonState {
  token?: string;
}

//todo use real container
const deps: { userService: UserService; logger: Logger; router: Router } = {
  //eslint-disable-next-line
    // @ts-ignore
  userService: container.get("user"),
  //eslint-disable-next-line
  //@ts-ignore
  router: container.get("router")
};

const state = {
  token: undefined
};

const mutations = {
  setToken(state: CommonState, token: string) {
    state.token = token;
  }
};

const actions = {
  login: async (
    { commit, dispatch, state }: ActionContext<CommonState, RootState>,
    payload: Credentials
  ) => {
    const token = await deps.userService.login(payload);
    commit("setToken", token);
    await deps.router.push({ name: "Home" });
  }
};

export default {
  state,
  mutations,
  actions
};
