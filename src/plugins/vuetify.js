import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

const theme = {
  primary: '#374C61',
  success: '#3FB984',
  error: '#EF5350'
}

export default new Vuetify({
  theme: {
    themes: {
      dark: theme,
      light: theme,
    }
  }
});
