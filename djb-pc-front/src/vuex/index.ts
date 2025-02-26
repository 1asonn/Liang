import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

export const store = createStore<object>({
  modules: {},
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
      key: 'lyy-vuex',
    }),
  ],
});
