import json from '@/assets/responseMeta.json'

const quran = {
    namespaced: true,
    state: {
        ayahaAudio: "",
        surahNum: "",
        objAudio:{},
        ayahaAudioStatus: false,
        ayahNumber: "",
        samePage:false,
        surahMeta:{},
        surah:[],
        surahPage:[],
        scrollerHeight:555,
        meta :json,
        editionSel:'',
        editionSelected:'',
        selected:null,
        edition:[],
        status:true,
        errors:[],
    },

    getters: {
        objAudio: state => state.objAudio,
        surahMeta: state => state.surahMeta,
        ayahaAudio: state => state.ayahaAudio,
        ayahaAudioStatus: state => state.ayahaAudioStatus,
        ayahNumber: state => state.ayahNumber,
        surahNum: state => state.surahNum,
        samePage: state => state.samePage,
        surah: state => state.surah,
        surahPage: state => state.surahPage,
        meta: state => state.meta,
        editionSel: state => state.editionSel,
        editionSelected: state => state.editionSelected,
        selected: state => state.selected,
        edition: state => state.edition,
        errors: state => state.errors,
        status: state => state.status,
    },
    mutations: {
        setAyahaAudio(state, data) {
            state.objAudio = data;
            state.ayahaAudio = data.audio;
            state.ayahNumber = data.number;
            state.ayahaAudioStatus = !!data;
            state.samePage = state.surahPage.ayahs.filter(e => Number(e.number) === Number(state.ayahNumber)).length > 0?true:false; 

        },
        setAyahaAudioStatus(state, ayahaAudioStatus) {
            state.ayahaAudioStatus = ayahaAudioStatus;
            state.status = true;
        },
        setAyahNumber(state, data) {
            state.ayahNumber = data.ayahNum;
        },
        setSurah(state, surah) {
            state.surahPage = surah;
            state.surah = 
              surah.ayahs.reduce((r, a) => {
            r[a.surah.number] = [...r[a.surah.number] || [], a];
            return r;
            }, {});
            // var s = state.surahNum;
            for (const property in state.surah) {
                if(property == state.surahNum)
                state.ayahNumber = state.surah[property][0].number;
              }

        },
        setSurahTab(state, surah) {
            state.surahPage = surah;
            state.surah = 
              surah.ayahs.reduce((r, a) => {
            r[a.surah.number] = [...r[a.surah.number] || [], a];
            return r;
            }, {});
        },
        setEditionSel(state, editionSel) {
            state.editionSel = editionSel;
        },
        setEditionSelected(state, editionSelected) {
            state.editionSelected = editionSelected;
        },
        setSelected(state, selected) {
            state.selected = selected;
        },
        setEdition(state, edition) {
            state.edition =
            edition.map((item, a) => {
                item.text = item.name 
                item.id = a+1 
                return item;
              }, {});
              for (const property in state.edition) {
                if(state.edition[property].identifier == "ar.abdulsamad")
                state.editionSel = state.edition[property];
              }
        },
        setSurahMeta(state, data) {
            state.surahMeta = state.meta.data.surahs.references[Number(data.surah) - 1];
        },
        setErrors(state,errors){
            state.errors = errors;
        },
        setPage(state,data){
            console.log(data);
            state.surahNum = Number(data.surah);
        },

    },
    actions: {
        async getAudioQuranByIyah({ commit  }, payload) {
            await this.$axios.$get(`http://api.alquran.cloud/v1/ayah/${payload.ayahNum}/ar.abdulsamad`).then(response => {
                var data = response.data;
                commit('setAyahaAudio', data);
            }).catch(error => {
                commit('setErrors', error);
               });
        },

        async getQuranByPage({ commit  }, payload) {
            commit('setPage', payload);

            // commit('setStatus', false);
            await this.$axios.$get(`http://api.alquran.cloud/v1/page/${payload.id}/ar.asad`).then(response => {
                var data = response.data;
                commit('setSurah', data);
            }).catch(error => {
                commit('setErrors', error);
               });
        },
        async getQuranByPageTab({ commit  }, payload) {
            // commit('setStatus', false);
            await this.$axios.$get(`http://api.alquran.cloud/v1/page/${payload.id}/ar.asad`).then(response => {
                var data = response.data;
                commit('setSurahTab', data);
            }).catch(error => {
                commit('setErrors', error);
               });
        },

        async getEdition({ commit }) {
            // commit('setStatus', false);
            await this.$axios.$get(`http://api.alquran.cloud/v1/edition?format=audio&language=ar&type=versebyverse`).then(response => {
                var data = response.data;
                commit('setEdition', data);
            }).catch(error => {
                commit('setErrors', error);
               });
        },
        updateSurahMeta({commit},payload){
            commit('setSurahMeta', payload);

        },
        updateAyahNumber({commit},payload){
            commit('setAyahNumber', payload);

        }
        
        


    }

};

export default quran;