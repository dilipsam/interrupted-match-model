<template>
  <v-card title="Overs Available" variant="elevated">
    <v-card-subtitle>
      <v-chip variant="outlined">overs-lost : {{ store.getOversLost() }}</v-chip>
    </v-card-subtitle>
    <v-card-text>
      <v-form>
        <v-text-field variant="outlined" label="Team A" v-model="store.innings[0].team"></v-text-field>
        <v-text-field variant="outlined" label="Team B" v-model="store.innings[1].team"></v-text-field>
        <v-text-field variant="outlined" label="Planned overs" v-model="store.oversPerTeam"></v-text-field>
        <v-text-field variant="outlined" label="Min overs that constitute a match" v-model="store.minimumOversThatConstituteAMatch"></v-text-field>
        <v-switch color="success" inset v-model="store.isFurtherPlayPossible" label="Further play possible"></v-switch>
        <v-text-field
          variant="outlined"
          v-for="(item, index) in store.interruptions"
          label="Stoppage minutes"
          v-model="store.interruptions[index]"
        ></v-text-field>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import { store } from "./../store.js";

export default {
  name: "Interruptions",
  data() {
    return {
      store,
    };
  },
};
</script>

<style scoped></style>
