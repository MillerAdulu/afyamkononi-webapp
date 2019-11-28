import Vue from 'vue';
import Vuetify from 'vuetify/lib';

import BaseSnackbar from '@/components/BaseSnackbar'

Vue.use(Vuetify);
Vue.component('base-snackbar', BaseSnackbar)

export default new Vuetify({
  icons: {
    iconfont: 'mdi',
  },
});
