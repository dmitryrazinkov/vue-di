import { ActionContext } from "vuex";
import { RootState } from "@/store/types";
import { Credentials, UserService } from "@/services/userService";
import container from "@/services/container";

export interface CommonState {
  token?: string;
}

//todo use real container
const deps: { userService: UserService } = {
  //eslint-disable-next-line
    // @ts-ignore
  userService: container.get("user")
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
  }
};

export default {
  state,
  mutations,
  actions
};
