<template>
  <v-card title="Summary" variant="elevated">
    <v-card-text>
      <v-chip class="ma-2" color="primary" variant="outlined">Overs Available: {{ store.oversPerTeam }}</v-chip>
      <v-chip class="ma-2" variant="outlined">Revised Overs: {{ store.oversPerTeam - store.getOversLost() }}</v-chip>
      <v-chip class="ma-2" variant="outlined">PAR Score: {{ store.getParScore() }}</v-chip>
      <v-chip class="ma-2" variant="outlined">Target: {{ store.getTarget() }}</v-chip>
      <v-chip class="ma-2" color="secondary" variant="elevated">Runs Required: {{ store.getRunsToGet() }}</v-chip>
      <v-chip class="ma-2" color="secondary" variant="elevated">Balls Remaining: {{ store.getBallsRemaining() }}</v-chip>
    </v-card-text>
  </v-card>
</template>

<script>
import { store } from "../store.js";

export default {
  name: "Summary",
  data() {
    return {
      store,
    };
  },
};
</script>

<style scoped></style>
