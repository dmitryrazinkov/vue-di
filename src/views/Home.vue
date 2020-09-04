<template>
  <div class="home">
    <div class="home-logout">
      <v-button @click="logout" class="button">
        {{ i18n.t("logout") }}
      </v-button>
    </div>
    <div class="home-meme">
      <img
        :src="
          'https://memegenerator.net/img/instances/59231645/say-dependency-injection-one-more-time-i-dare-you.jpg'
        "
      />
    </div>
  </div>
</template>

<script lang="ts">
import {Options, setup, Vue} from "vue-class-component";
import VButton from "@/components/VButton.vue";
import {useI18n} from "vue-i18n";

@Options({
  components: {
    VButton
  }
})
export default class Home extends Vue {
  i18n = setup(() => useI18n());

  // Example of usage injection decorator
  // @ComponentInject(TYPES.ILogger)
  // logger: ILogger;

  async logout() {
    // Example of usage services' plugin injection
    this.$logger.logInfo("Initiate logout!");

    // With DI
    await this.$store.dispatch("logout");

    // Without DI: Plugins passed via payload
    // await this.$store.dispatch("logout", { router: this.$router });

    // Without DI: Plugins passed via global property
    // await this.$store.dispatch("logout");

    // Without DI: Plugins passed via root state
    // await this.$store.dispatch("logout");
  }
}
</script>

<style scoped lang="scss">
.home {
  display: flex;
  flex-direction: column;
  height: inherit;
  &-logout {
    display: flex;
    justify-content: flex-end;
    padding: 16px;
  }
  &-meme {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
  }
}
</style>
