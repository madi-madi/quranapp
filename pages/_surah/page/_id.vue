<template>
  <div>
  <Navbar :meta-data="meta" :edition="edition" :chang-select-edition="changSelectEdition" :edition-sel="editionSelected" >
        <div class="col"> 
        <select2 :options="meta.data.surahs.references" elm="meta" v-model="selected" :change-surah="changeSurah">
        <option disabled value="0">Select one</option>
        </select2>

        <!-- <b-nav-item-dropdown text="Lang" right>
          <b-dropdown-item v-for(index , item0) v-on:click="SelectEdition(item)" >{{}}</b-dropdown-item>
        </b-nav-item-dropdown> -->
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
      <b-row
        class="justify-content-center  mb-5 overflow-auto quran-banner" ref="app"
        :style="{ height: scrollerHeight }"
      >

        <!-- Content here -->

        <!-- <div class="col-12 col-lg-4 col-md-6 col-sm-12 frame h-100 " :style="{height: scrollerHeight}" @mouseenter="mouseEnter" @mousemove="mouseMove" @mouseleave="mouseLeave"  > -->
          <PageQuran :surah="surah" :meta="meta" :ayah-number="ayahNumber"></PageQuran>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import json from '@/assets/responseMeta.json'
import AudioPlayer from "@/components/player";
import PageQuran from '@/components/PageQuran.vue';
export default {
  // computed: {
  //   // a computed getter
  //   fillterd() {
  //     // `this` points to the vm instance
  //     return this.message.split('').reverse().join('')
  //   }
  // },
  watch: {
    scrollerHeight: { 
     immediate:true,
     handler:function(newValue){
     },
    },
    // selected: { 
    //  immediate:true,
    //  handler:function(newValue){
    //  var obj = this.meta.data.surahs.references[Number(newValue) -1];
    // // this.getPage(this.$route.params.surah,this.$route.params.lang,obj.startPage);

       
    //  },
    // },
    
  },
  components: {
    AudioPlayer,
    PageQuran
  },
  data() {
    return {
      ayahaAudio: "",
      ayahaAudioStatus: false,
      ayahNumber: "",
      surah:'',
       message: 'Hello',
      scrollerHeight:555,
      meta :json,
      editionSel:'',
      editionSelected:'',
      selected:Number(this.$route.params.surah),

    };
  },
    async asyncData({ $axios, params }) {
    try {
      const responseEdition = await $axios.$get(`https://api.alquran.cloud/v1/edition?format=audio&language=ar&type=versebyverse`);
      const response = await $axios.$get(`http://api.alquran.cloud/v1/page/${params.id}/ar.asad`);
      return { surah: response.data,edition:responseEdition.data };
    } catch (err) {
      if (err.response.status === 404) {
        error({ statusCode: 404, message: 'Design not found' });
      } else {
        error({ statusCode: 500, message: 'Internal server error' });
      }
    }
  },

  mounted() {
    if(this.surah)
    this.getQuranAudio(this.surah.ayahs[0].number);

    const that = this;
    window.onresize = () =>{
      return (()=>{
        that.scrollerHeight = that.$refs.app.clientHeight;
      });
    };
  },
  methods: {
    changeSurah(){
      var newValue = this.selected;
           var obj = this.meta.data.surahs.references[Number(newValue) -1];
          this.$router.push({ name: 'surah-page-id', params: { surah:obj.id ,lang:this.$route.params.lang,id:obj.startPage} });

    // this.getPage(obj.id,this.$route.params.lang,obj.startPage);
    },
    getQuranAudio(ayahNum) {
      this.ayahNumber = ayahNum;
      var stored = JSON.parse(localStorage.getItem("editionSel"));
      if (this.editionSel || stored) {
        var edition =stored.edition?? this.editionSel;
        this.editionSelected = Number(stored.selected)??1;
      }else{
        var edition = this.editionSel = this.edition[0].identifier;
        this.editionSelected = 1;
      }
    //  var t =  this.surah.ayahs.filter(function(item , index){
    //     if (Number(item.number) === Number(ayahNum)) {
    //       return true;
    //       }
    //   });
      

    if (this.surah.ayahs.filter(e => Number(e.number) === Number(ayahNum)).length > 0) {
        this.ayahaAudioStatus = false;
        this.$axios
        .$get(`http://api.alquran.cloud/v1/ayah/${ayahNum}/${edition}`)
        .then(
        res => (
          (this.ayahaAudio = res.data.audio), (this.ayahaAudioStatus = true)
        )
        )

    }else{
    this.getPage(this.$route.params.surah,Number(this.$route.params.id)+1);

    }
    //   if(t)
   
    },
        getPage(surah ,id ) {
          // numberOfAyahs
          var obj = this.meta.data.surahs.references[Number(surah) - 1];
          if(Number(this.ayahNumber) > Number(obj.numberOfAyahs)){
          var obj = this.meta.data.surahs.references[Number(surah)];
            surah = obj.id;
            id=obj.startPage;
            
          }

          this.$router.push({ name: 'surah-page-id', params: { surah:surah,id:id} });
        // this.$axios
        //   .$get(
          //   `http://api.alquran.cloud/v1/page/${page}/${this.$route.params.lang}.asad`
          
      //     )
      //   .then(
      //     res => (
      //       (this.$router.push({ name: 'user', params: { surah:surah ,lang:language} }))
      //     )
      //   )
    },

    changSelectEdition(id){
     this.editionSel= this.edition[id-1].identifier;
     localStorage.setItem("editionSel", JSON.stringify({"edition":this.editionSel,"selected":id}));
     this.getQuranAudio(this.ayahNumber);
    }
  }
};
</script>

<style lang="css" scoped>

.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  overflow-x: hidden !important;
}


</style>
