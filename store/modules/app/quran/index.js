import json from '@/assets/responseMeta.json'
// if(process.client){
//     var optionQuran = JSON.parse(localStorage.getItem("quran")).edition;
// }
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
        tafseer:{},
        surah:[],
        surahPage:[],
        scrollerHeight:555,
        meta :json,
        editionSel:'',
        Identifier:'',
        editionSelected:'',
        surahSelected:null,
        selected:null,
        edition:[],
        status:true,
        errors:[],
        skeleton: null,
        page_loading: false
    },

    getters: {
        skeleton: state => state.skeleton,
        page_loading: state => state.page_loading,
        objAudio: state => state.objAudio,
        surahMeta: state => state.surahMeta,
        tafseer: state => state.tafseer,
        ayahaAudio: state => state.ayahaAudio,
        ayahaAudioStatus: state => state.ayahaAudioStatus,
        ayahNumber: state => state.ayahNumber,
        surahNum: state => state.surahNum,
        samePage: state => state.samePage,
        surah: state => state.surah,
        surahPage: state => state.surahPage,
        meta: state => state.meta,
        editionSel: state => state.editionSel,
        editionSel: state => state.editionSel,
        editionSelected: state => state.editionSelected,
        Identifier: state => state.Identifier,
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
            state.status = !!surah;
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
            state.status = !!surah;
            state.surahPage = surah;
            this.$router.push({
                name: "surah-surah-page-id",
                params: { surah: surah.ayahs[0].surah.number, id: surah.ayahs[0].page }
              });
            state.ayahNumber = surah.ayahs[0].number;
            state.surah = 
              surah.ayahs.reduce((r, a) => {
            r[a.surah.number] = [...r[a.surah.number] || [], a];
            return r;
            }, {});
        },
        setEditionSel(state, data) {
             state.editionSel = data.editionSel;
             for (const property in state.edition) {
                if(Number(state.edition[property].id) === Number(state.editionSel))
                state.Identifier = state.edition[property].identifier;
              }
        },
        setEditionSelected(state, editionSelected) {
            state.editionSelected = editionSelected;
        },
        setSurahSelected(state, data) {
            state.surahSelected = data.surah;
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
                
                if(state.edition[property].identifier == "ar.abdulsamad"){
                    var edition = state.edition[property];
                    state.editionSel = edition.id;
                    state.Identifier = edition.identifier;

                }
              }
        },
        setSurahMeta(state, data) {
            var surahMeta = state.meta.data.surahs.references[Number(data.surah) - 1];
            state.surahMeta = surahMeta;
            state.surahSelected =  surahMeta.id??null;
        },
        setErrors(state,errors){
            state.errors = errors;
        },
        setStatus(state,status){
            state.status = status;
        },
        setPage(state,data){
            state.surahNum = Number(data.surah);
        },
        setTafseer(state,data){
            state.tafseer =data;
        },
        

    },
    actions: {
        async getAudioQuranByIyah({ commit ,state }, payload) {

            await this.$axios.$get(`http://api.alquran.cloud/v1/ayah/${payload.ayahNum}/${state.Identifier}`).then(response => {
                var data = response.data;
                commit('setAyahaAudio', data);
                // var quran = { 'edition': {id:state.editionSel,Identifier:state.Identifier}};
                // localStorage.setItem("quran", JSON.stringify(quran));
            }).catch(error => {
                commit('setErrors', error);
               });
        },

        async getQuranByPage({ commit  }, payload) {
            commit('setPage', payload);
             commit('setStatus', false);
            await this.$axios.$get(`http://api.alquran.cloud/v1/page/${payload.id}/ar.asad`).then(response => {
                var data = response.data;
                commit('setSurah', data);
            }).catch(error => {
                commit('setErrors', error);
               });
        },
        async getQuranByPageTab({ commit  }, payload) {
             commit('setStatus', false);
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
        async getAyahWthTafseer({ commit  }, payload) {
            // commit('setStatus', false);
            await this.$axios.$get(`https://api.alquran.cloud/ayah/${payload.id}/ar.muyassar`).then(response => {
                var data = response.data;
                commit('setTafseer', data);
            }).catch(error => {
                commit('setErrors', error);
               });
        },
        updateSurahMeta({commit},payload){
            commit('setSurahMeta', payload);

        },
        updateAyahNumber({commit},payload){
            commit('setAyahNumber', payload);

        },

        updateSurahSelected({commit},payload){
            commit('setSurahSelected', payload);
        }
        
        
        


    }

};

export default quran;