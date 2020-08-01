<template>
  <div class="home">
    <v-button @click="logout">
      {{ i18n.t("logout") }}
    </v-button>
  </div>
</template>

<script lang="ts">
import { Options, setup, Vue } from "vue-class-component";
import VButton from "@/components/VButton.vue";
import { useI18n } from "vue-i18n";

@Options({
  components: {
    VButton
  }
})
export default class Home extends Vue {
  i18n = setup(() => useI18n());

  async logout() {
    await this.$store.dispatch("logout");
  }
}
</script>
