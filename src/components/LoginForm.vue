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
      v-model="credentials.password"
    ></v-input>
    <v-button type="submit" class="login-form__button">Login</v-button>
  </form>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Credentials } from "@/components/types";
import VButton from "@/components/VButton.vue";
import VInput from "@/components/VInput.vue";

@Options({
  components: { VButton, VInput }
})
export default class LoginForm extends Vue {
  credentials: Credentials = { username: "", password: "" };
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
