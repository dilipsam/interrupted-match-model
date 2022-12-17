<template>
  <v-expansion-panels variant="inset">
    <v-expansion-panel>
      <v-expansion-panel-title>
        {{ store.innings[innings].team }}
        <v-chip class="ml-2" variant="outlined"> RR: {{ store.getRunRate(store.innings[innings]) }} </v-chip>
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <v-form class="mt-4">
          <v-text-field variant="outlined" type="number" label="Runs" v-model="store.innings[innings].runs"> </v-text-field>
          <v-text-field variant="outlined" type="number" label="Overs" v-model="store.innings[innings].overs"> </v-text-field>
          <v-select variant="outlined" v-model="store.innings[innings].balls" label="Balls" :items="[0, 1, 2, 3, 4, 5]"></v-select>
        </v-form>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import { store } from "./../store.js";

export default {
  name: "Innings",
  props: {
    innings: String,
  },
  data() {
    return {
      store,
    };
  },
};
</script>

<style scoped></style>
