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
import {ComponentInject} from "@/services/helpers/componentInject";
import {TYPES} from "@/services/helpers/containerTypes";
import {ILogger} from "@/services/logger";

@Options({
  components: {
    VButton
  }
})
export default class Home extends Vue {
  i18n = setup(() => useI18n());

  @ComponentInject(TYPES.ILogger)
  logger: ILogger;

  async logout() {
    this.logger.logInfo("Initiate logout!");
    await this.$store.dispatch("logout");
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
