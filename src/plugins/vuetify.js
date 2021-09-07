import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

const theme = {
  primary: '#374C61',
  success: '#3FB984',
  error: '#D32F2F'
}

export default new Vuetify({
  theme: {
    themes: {
      dark: theme,
      light: theme,
    }
  }
});
