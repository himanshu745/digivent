import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        options: {
          customProperties: true,
        },
        themes: {
          light: {
            primary: '#05386b',
            secondary: '#5cdb95',
            secondaryLight: '#edf5e1',
            secondaryDark: '#379683',
            naturalDark: '#5f5f5f',
            naturalLight: '#bdbdbd',
          },
        },
    }
});
