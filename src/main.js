import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { aliases } from 'vuetify/iconsets/mdi'
import { mdi } from 'vuetify/iconsets/mdi'



// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const vuetify = createVuetify({
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    }
  },
  components,
  directives,
  theme: {
    defaultTheme: 'light'
  }
});

createApp(App).use(vuetify).mount("#app");
