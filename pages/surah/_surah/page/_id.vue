<template>
  <div>
    <Navbar :meta-data="meta">
      <div class="col">
        <select2
          :options="meta.data.surahs.references"
          elm="meta"
          v-model="surahSelected"
          :change-surah="changeSurah"
        >
          <option disabled value="0">Select one</option>
        </select2>

        <!-- <b-nav-item-dropdown text="Lang" right>
          <b-dropdown-item v-for(index , item0) v-on:click="SelectEdition(item)" >{{}}</b-dropdown-item>
        </b-nav-item-dropdown> -->
      </div>
      <div class="col" v-if="edition">
        <select2
          :options="edition"
          elm="edition"
          v-model="editionSel"
          :change-surah="changSelectEdition"
        >
          <option disabled value="0">Select one</option>
        </select2>
      </div>
    </Navbar>
    <b-container fluid class="p-0 mt-2">
      <b-row class="justify-content-center overflow-auto text-center ">
        <div class="col col-lg-4 col-md-6 col-sm-12  ">
          <div id="audio" class="player-wrapper">
            <AudioPlayer
              :status="!!ayahaAudio"
              :ayah="ayahNumber"
              :file="ayahaAudio"
              :get-quran-audio="getQuranAudio"
              :auto-play="true"
            ></AudioPlayer>
          </div>
        </div>
      </b-row>
    </b-container>
    <b-container fluid class="p-0 mt-2">
      <b-row
        class="justify-content-center  mb-5 overflow-auto quran-banner"
        ref="app"
        :style="{ height: scrollerHeight }"
      >
        <!-- Content here -->

        <!-- <div class="col-12 col-lg-4 col-md-6 col-sm-12 frame h-100 " :style="{height: scrollerHeight}" @mouseenter="mouseEnter" @mousemove="mouseMove" @mouseleave="mouseLeave"  > -->
        <div class="col-xs-12 col-lg-4 col-md-6 col-sm-12 mt-0 ">
          <a
            v-on:click.prevent="goNext()"
            title="التالي"
            class="next position-absolute"
            href="#"
          >
            <svg
              version="1.1"
              width="100%"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 473.654 473.654"
              style="enable-background:new 0 0 473.654 473.654;"
              xml:space="preserve"
            >
              <circle
                style="fill:#4ABC96;"
                cx="236.827"
                cy="236.827"
                r="236.827"
              />
              <path
                style="fill:#FFFFFF;"
                d="M338.566,193.946c-25.904,0-51.808,0-77.712,0c-4.162,0-7.965,0.546-11.495,1.455
              c0-13.399,0-26.798,0-40.2c0-24.666-30.515-37.411-47.994-19.932c-27.011,27.011-54.018,54.022-81.029,81.033
              c-10.841,10.841-10.549,28.907,0.213,39.669c27.011,27.007,54.018,54.018,81.029,81.025c9.446,9.446,20.796,9.947,30.062,5.553
              c9.846-3.336,17.722-11.753,17.722-25.291c0-13.489,0-26.974,0-40.462c3.354,0.819,6.959,1.309,10.89,1.309
              c25.904,0,51.808,0,77.712,0C392.293,278.105,392.775,193.946,338.566,193.946z"
              />
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
            </svg>
          </a>
          <a
          v-on:click.prevent="goPrevious()"
          title="السابق"
          class="previous position-absolute"
          href="#"
          >
            <svg
              version="1.1"
              width="100%"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 473.654 473.654"
              style="enable-background:new 0 0 473.654 473.654;"
              xml:space="preserve"
            >
              <circle
                style="fill:#4ABC96;"
                cx="236.827"
                cy="236.827"
                r="236.827"
              />
              <path
                style="fill:#FFFFFF;"
                d="M358.075,216.091c-27.011-27.011-54.018-54.022-81.029-81.033
            c-25.56-25.564-65.08,14.259-39.456,39.883c11.009,11.009,22.019,22.019,33.028,33.032c-43.353,0-86.706,0-130.055,0
            c-36.225,0-36.543,56.109-0.404,56.109c43.491,0,86.982,0,130.47,0c-11.084,11.084-22.168,22.168-33.252,33.252
            c-25.564,25.56,14.259,65.08,39.883,39.456c27.011-27.007,54.018-54.014,81.029-81.025
            C369.133,244.916,368.838,226.85,358.075,216.091z"
              />
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
            </svg>
          </a>
          <PageQuran
            :surah="surah"
            :meta="meta"
            :ayah-number="ayahNumber"
            :surah-page="surahPage"
          ></PageQuran>
        </div>
        <div
          class="col-xs-12 col-lg-4 col-md-6 col-sm-12 mt-0 border border-success p-4 m-2 text-justify tafseer "
        >
          <p>
            {{ tafseer.text }}
          </p>
        </div>
      </b-row>
    </b-container>
    <!-- <PageQuran :surah="surah" :meta="meta" :ayah-number="ayahNumber"></PageQuran> -->
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import AudioPlayer from "@/components/player";

export default {
    head() {
      var s =this.$route.params.surah;
        var objSurah = this.meta.data.surahs.references[Number(this.$route.params.surah)-1];

return{
    title: "Quran قرآن كريم",
    meta: [
      { hid: 'description', name: 'description', content: `خيركم من تعلم القرآن وعلمه - صدقة جارية 
      [ ${objSurah.text} - ${s } ]
       -
       صفحة رقم  
       -
      ( ${this.$route.params.id} )

       ` }
    ]}
  },
  async fetch({ store, params }) {
    // dispatch action fetchAllPosts
    await store.dispatch("quran/getQuranByPage", {
      id: params.id,
      surah: params.surah
    });
    await store.dispatch("quran/getEdition");
  },
  created() {
    this.updateSurahMeta({ surah: this.$route.params.surah });
    // this.updateSurahSelected({surahSelected:obj.id});
  },
  methods: {
    ...mapActions("quran", [
      "getQuranByPage",
      "getQuranByPageTab",
      "getAyahWthTafseer",
      "getEdition",
      "getAudioQuranByIyah",
      "updateAyahNumber",
      "updateSurahMeta",
      "updateSurahSelected"
    ]),
    goNext() {
        if(this.surahPage.ayahs[0]){
          var page = this.surahPage.ayahs[0].page;
          page = page +1;
          if (page <= 603) {
              this.getQuranByPageTab({ id: page }
              );
          }

        }

    },
    goPrevious() {

        if(this.surahPage.ayahs[0]){
          var page = this.surahPage.ayahs[0].page;
          page = page -1;
          if (page > 0) {
              this.getQuranByPageTab({ id: page }
              );
          }

        }

    },
    changeSurah() {
      var newValue = this.surahSelected;
      var obj = this.meta.data.surahs.references[Number(newValue) - 1];
      this.$router.push({
        name: "surah-surah-page-id",
        params: { surah: obj.id, id: obj.startPage }
      });

    },

    getQuranAudio(ayahNum) {
      if (
        this.surahPage.ayahs.filter(e => Number(e.number) === Number(ayahNum))
          .length > 0
      ) {
        this.getAudioQuranByIyah({ ayahNum: ayahNum });
        this.getAyahWthTafseer({ id: ayahNum });
                var objAudio = this.objAudio;
        var surah = objAudio.surah.number;
        this.$store.commit('quran/setSurahSelected', {surah:surah})

      } else {
        var objAudio = this.objAudio;
        var surah = objAudio.surah.number;
        var obj = this.meta.data.surahs.references[Number(surah) - 1];
        if (Number(ayahNum) > Number(obj.numberOfAyahs)) {
          var obj = this.meta.data.surahs.references[Number(surah)];
          surah = obj.id;
        }
        // this.selected = surah;
        this.$store.commit('quran/setSurahSelected', {surah:surah})

        var id = Number(objAudio.page) + 1;
        var newUrl = "/surah/:surah/page/:id";
        newUrl = newUrl.replace(":surah", surah);
        newUrl = newUrl.replace(":id", id);
        this.getQuranByPage({ id: id });
        this.getAudioQuranByIyah({ ayahNum: ayahNum });
        this.getAyahWthTafseer({ id: ayahNum });

        window.history.replaceState({}, "", newUrl);
      }
    },
    getPage(surah, id, ayahNum) {
      // numberOfAyahs
      var obj = this.meta.data.surahs.references[Number(surah) - 1];
      if (Number(ayahNum) > Number(obj.numberOfAyahs)) {
        this.updateAyahNumber({ ayahNum: ayahNum });
        var obj = this.meta.data.surahs.references[Number(surah)];
        surah = obj.id;
        id = obj.startPage;
      }
      var self = this;

      this.$router.replace({
        name: "surah-surah-page-id",
        params: { surah: surah, id: id }
      });
    },
    changSelectEdition() {
        this.getAudioQuranByIyah({ ayahNum: this.ayahNumber });

    },
    visibilityListener() {
      switch (document.visibilityState) {
        case "visible":
          // console.log(new Date());

          // var objAudio = this.objAudio;
          // var page = Number(objAudio.page);
          // var newUrl = "/surah/:surah/page/:id";
          // newUrl = newUrl.replace(":surah", objAudio.surah.number);
          // newUrl = newUrl.replace(":id", page);
          // window.history.replaceState({}, "", newUrl);
          // this.getQuranByPageTab({ id: page });
          break;
      }
    }
  },
  data() {
    return {
      //  message: 'Hello',
      scrollerHeight: 555,
      // meta :json,
      // editionSel:'',
      // editionSelected:'',
      selectedEdition: "",
      selected: Number(this.$route.params.surah)
      //  editionselection : null,
    };
  },
  components: {
    AudioPlayer
  },
  computed: {
    ...mapGetters("quran", [
      "surahNum",
      "surah",
      "surahPage",
      "tafseer",
      "objAudio",
      "ayahaAudio",
      "ayahNumber",
      "samePage",
      "ayahaAudioStatus",
      "meta",
      "edition",
      "editionSel",
      "editionSelected",
      "errors",
      "status",
      // "surahSelected"
    ]),
    surahSelected: {
    get () {
      return this.$store.state.quran.surahSelected
    },
    set (value) {
      this.$store.commit('quran/setSurahSelected', {surah:value})
    }
  },
    editionSel: {
    get () {
      return this.$store.state.quran.editionSel
    },
    set (value) {
      this.$store.commit('quran/setEditionSel', {editionSel:value})
    }
  },
  },
  mounted() {
    document.addEventListener("visibilitychange", this.visibilityListener);

    if (this.ayahNumber) {
      this.getAudioQuranByIyah({ ayahNum: this.ayahNumber });
      this.getAyahWthTafseer({ id: this.ayahNumber });
    }

    const that = this;
    window.onresize = () => {
      return () => {
        that.scrollerHeight = that.$refs.app.clientHeight;
      };
    };
    // if (localStorage.editionSel) {
    // this.editionselection = JSON.parse(localStorage.getItem("editionSel"));
    // }
  }
};
</script>

<style lang="css" scoped>
.tafseer {
  direction: rtl;
}
.next {
  z-index: 9999;
  left: 5% !important;
  top: 46%;
  width: 7%;
  height: 7%;
}
.previous {
  z-index: 9999;
  right: 5% !important;
  top: 46%;
  width: 7%;
  height: 7%;
}
</style>
