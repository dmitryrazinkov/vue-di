import {CommonState} from "@/store/common";

export interface RootState {
  common: CommonState;
  vueGlobalProperties?: Record<string, any>;
}
