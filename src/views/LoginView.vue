<template>
  <article class="login-view">
    <login-form class="login-view__form" @login="login"></login-form>
  </article>
</template>

<script lang="ts">
import {Options, Vue} from "vue-class-component";
import LoginForm from "../components/LoginForm.vue";
import {Credentials} from "@/services/userService";
import {ComponentInject} from "@/services/helpers/componentInject";
import {TYPES} from "@/services/helpers/containerTypes";
import {ILogger} from "@/services/logger";

@Options({
  components: { LoginForm }
})
export default class LoginView extends Vue {
  @ComponentInject(TYPES.ILogger)
  logger: ILogger;

  async login(credentials: Credentials) {
    this.logger.logInfo("Initiate login!");
    await this.$store.dispatch("login", credentials);
    this.logger.logInfo("Initiate logged in!");
  }
}
</script>

<style scoped lang="scss">
.login-view {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  &__form {
    width: 300px;
  }
}
</style>
