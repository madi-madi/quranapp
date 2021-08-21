import Vuex from 'vuex'

// modules


import quran from './modules/app/quran';
// Vue.use(Vuex);

const quran_store = () => {
     return    new Vuex.Store({
          //     namespaced: true,
          
              modules: {
                quran,
              }
          });
 }

export default quran_store;