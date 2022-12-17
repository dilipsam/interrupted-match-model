<script>
import Innings from "./components/Innings.vue";
import { useTheme } from "vuetify";
import Interruptions from "./components/Interruptions.vue";
import Summary from "./components/Summary.vue";
import { store } from "./store.js";

export default {
  computed: {
    store() {
      return store;
    },
  },
  components: { Summary, Interruptions, Innings },
  setup() {
    const theme = useTheme();

    return {
      theme,
      toggleTheme: () => (theme.global.name.value = theme.global.current.value.dark ? "light" : "dark"),
    };
  },
};
</script>

<template>
  <v-app>
    <v-btn @click="toggleTheme" class="ma-2" icon="mdi-home"></v-btn>
    <v-form v-model="valid">
      <v-container>
        <v-banner color="red" v-if="store.isMatchAbandoned()" class="mb-4 bg-deep-orange-lighten-5 elevation rounded">
          <v-banner-text> Match abandoned </v-banner-text>
        </v-banner>

        <v-banner v-if="!store.isMatchAbandoned() && store.getResult()" class="mb-4 bg-green-accent-3 elevation rounded">
          <v-banner-text> {{ store.getResult() }} </v-banner-text>
        </v-banner>

        <v-row>
          <v-col cols="12" md="12">
            <Summary></Summary>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="4">
            <Interruptions></Interruptions>
          </v-col>
          <v-col cols="12" md="4">
            <Innings innings="0"></Innings>
          </v-col>
          <v-col cols="12" md="4">
            <Innings innings="1"></Innings>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </v-app>
</template>

<style scoped></style>
