<template>
  <div class="home">
    Home!
  </div>
  <h1>
    {{ testValue }}
  </h1>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import { container } from "@/services/container";

export default class Home extends Vue {
  testValue = "";

  created() {
    this.testValue = container.dep;
  }
}
</script>
