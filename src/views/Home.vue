<template>
  <div class="home">
    Home!
  </div>
  <h1>
    {{ value }}
  </h1>
  <button @click="updateDep">Set</button>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import container from "@/services/container";

export default class Home extends Vue {
  value = container.get("dep");

  updateDep() {
    this.value = container.get("dep");
  }
}
</script>
