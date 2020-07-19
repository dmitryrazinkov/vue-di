<template>
  <article class="login-view">
    <login-form class="login-view__form" @login="login"></login-form>
  </article>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import LoginForm from "../components/LoginForm.vue";
import { Credentials } from "../components/types";

@Options({
  components: { LoginForm }
})
export default class LoginView extends Vue {
  login(credentials: Credentials) {
    alert(JSON.stringify(credentials));
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
