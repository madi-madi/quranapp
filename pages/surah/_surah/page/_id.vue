<template>
  <div>
  <Navbar :meta-data="meta"  >
        <div class="col"> 
        <select2 :options="meta.data.surahs.references" elm="meta" v-model="selected" :change-surah="changeSurah">
        <option disabled value="0">Select one</option>
        </select2>

        <!-- <b-nav-item-dropdown text="Lang" right>
          <b-dropdown-item v-for(index , item0) v-on:click="SelectEdition(item)" >{{}}</b-dropdown-item>
        </b-nav-item-dropdown> -->
        </div>
        <div class="col" v-if="edition" >
        <select2 :options="edition" elm="edition" v-model="selectedEdition" :change-surah="changSelectEdition" >
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
        class="justify-content-center  mb-5 overflow-auto quran-banner" ref="app"
        :style="{ height: scrollerHeight }"
      >

        <!-- Content here -->

        <!-- <div class="col-12 col-lg-4 col-md-6 col-sm-12 frame h-100 " :style="{height: scrollerHeight}" @mouseenter="mouseEnter" @mousemove="mouseMove" @mouseleave="mouseLeave"  > -->
          <PageQuran :surah="surah" :meta="meta" :ayah-number="ayahNumber"></PageQuran>
      </b-row>
    </b-container>
<!-- <PageQuran :surah="surah" :meta="meta" :ayah-number="ayahNumber"></PageQuran> -->
  </div>
</template>

<script>
import { mapActions, mapGetters} from 'vuex';
import AudioPlayer from "@/components/player";

  export default {
    async fetch ({store,params}) {
    // dispatch action fetchAllPosts
    await store.dispatch('quran/getQuranByPage',{"id":params.id,"surah":params.surah})
    await store.dispatch('quran/getEdition')
    
  },
  created () {
  this.updateSurahMeta({surah:this.$route.params.surah});
  },
  methods: {
   ...mapActions('quran', ['getQuranByPage','getQuranByPageTab','getEdition','getAudioQuranByIyah','updateAyahNumber','updateSurahMeta']),
    changeSurah(){
      var newValue = this.selected;
           var obj = this.meta.data.surahs.references[Number(newValue) -1];
          this.$router.push({ name: 'surah-surah-page-id', params: { surah:obj.id ,id:obj.startPage} });

    },

    getQuranAudio(ayahNum) {
      if(this.surahPage.ayahs.filter(e => Number(e.number) === Number(ayahNum)).length > 0){
        this.getAudioQuranByIyah({"ayahNum": ayahNum});
      }else{
                var objAudio = this.objAudio;
        var surah = objAudio.surah.number;
                  var obj = this.meta.data.surahs.references[Number(surah) - 1];
          if(Number(ayahNum) > Number(obj.numberOfAyahs)){
          var obj = this.meta.data.surahs.references[Number(surah)];
            surah = obj.id;
            
          }
        this.selected = surah;
        var id = Number(objAudio.page)+1;
        var newUrl = "/surah/:surah/page/:id";
        newUrl = newUrl.replace(':surah',surah); 
        newUrl =  newUrl.replace(':id',id); 
        this.getQuranByPage({'id':id});
        this.getAudioQuranByIyah({"ayahNum": ayahNum});

         window.history.replaceState({}, '',newUrl);



      }
   
    },
        getPage(surah ,id ,ayahNum ) {
          // numberOfAyahs
          var obj = this.meta.data.surahs.references[Number(surah) - 1];
          if(Number(ayahNum) > Number(obj.numberOfAyahs)){

            this.updateAyahNumber({"ayahNum": ayahNum});
          var obj = this.meta.data.surahs.references[Number(surah)];
            surah = obj.id;
            id=obj.startPage;
            
          }
          var self = this;
        

          this.$router.replace({ name: 'surah-surah-page-id', params: { surah:surah,id:id} });
  },
    changSelectEdition(){
    },
    visibilityListener() {
      switch(document.visibilityState) {

      case "visible":
        var objAudio = this.objAudio;
        var ayahNum = this.ayahNumber;
      if(this.surahPage.ayahs.filter(e => Number(e.number) === Number(ayahNum)).length > 0)
        var page = Number(objAudio.page);
        else
        var page = Number(objAudio.page)+1;

        var newUrl = "/surah/:surah/page/:id";
        newUrl = newUrl.replace(':surah',objAudio.surah.number); 
        newUrl =  newUrl.replace(':id',page); 
        window.history.replaceState({}, '',newUrl);
        this.getQuranByPageTab({'id':page});
      break;
      }
    }
  },
  data() {
    return {
      //  message: 'Hello',
      scrollerHeight:555,
      // meta :json,
      // editionSel:'',
      // editionSelected:'',
      selectedEdition:'',
      selected:Number(this.$route.params.surah),
      //  editionselection : null,

    };
  },
  components:{
    AudioPlayer
  },
  computed:{
    ...mapGetters('quran', ["surahNum","surah","surahPage","objAudio","ayahaAudio","ayahNumber","samePage","ayahaAudioStatus","meta","edition","editionSel","editionSelected","errors",'status']),


  },
  mounted(){
		 document.addEventListener("visibilitychange", this.visibilityListener);

        if(this.ayahNumber)
        this.getAudioQuranByIyah({"ayahNum": this.ayahNumber});

    const that = this;
    window.onresize = () =>{
      return (()=>{
        that.scrollerHeight = that.$refs.app.clientHeight;
      });
    };
    // if (localStorage.editionSel) {
    // this.editionselection = JSON.parse(localStorage.getItem("editionSel"));
    // }
  },

  }
</script>

<style lang="scss" scoped>

</style>