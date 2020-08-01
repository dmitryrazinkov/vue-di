<template>
  <form
    class="login-form"
    novalidate
    autocomplete="off"
    @submit.prevent="$emit('login', credentials)"
  >
    <v-input
      class="login-form__input"
      label="Username"
      v-model="credentials.username"
    ></v-input>
    <v-input
      class="login-form__input"
      label="Password"
      type="password"
      v-model="credentials.password"
    ></v-input>
    <v-button type="submit" class="login-form__button">{{
      i18n.t("login")
    }}</v-button>
  </form>
</template>

<script lang="ts">
import { Options, setup, Vue } from "vue-class-component";
import VButton from "@/components/VButton.vue";
import VInput from "@/components/VInput.vue";
import { Credentials } from "@/services/userService";
import { useI18n } from "vue-i18n";

@Options({
  components: { VButton, VInput }
})
export default class LoginForm extends Vue {
  credentials: Credentials = { username: "", password: "" };
  i18n = setup(() => useI18n());
}
</script>

<style scoped lang="scss">
.login-form {
  display: flex;
  flex-direction: column;

  &__input {
    margin-bottom: 4px;
  }

  &__button {
    margin-top: 8px;
  }
}
</style>
