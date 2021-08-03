<template>
  <div>
  <Navbar :meta-data="meta">
        <div class="col"> 
        <select2 :options="meta.data.surahs.references" v-model="selected" :change-surah="changeSurah">
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
       console.log(newValue);
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
      selected:Number(this.$route.params.surah),

    };
  },
    async asyncData({ $axios, params }) {
    try {
      const response = await $axios.$get(`http://api.alquran.cloud/v1/page/${params.id}/ar.asad`);
      console.log(response);
      return { surah: response.data };
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
      // console.log(this.selected);
      var newValue = this.selected;
           var obj = this.meta.data.surahs.references[Number(newValue) -1];
          this.$router.push({ name: 'surah-page-id', params: { surah:obj.id ,lang:this.$route.params.lang,id:obj.startPage} });

    // this.getPage(obj.id,this.$route.params.lang,obj.startPage);
    },
    getQuranAudio(ayahNum) {
      this.ayahNumber = ayahNum;
    //  var t =  this.surah.ayahs.filter(function(item , index){
    //     if (Number(item.number) === Number(ayahNum)) {
    //       return true;
    //       }
    //   });
      

    if (this.surah.ayahs.filter(e => Number(e.number) === Number(ayahNum)).length > 0) {
        this.ayahaAudioStatus = false;
        this.$axios
        .$get(`http://api.alquran.cloud/v1/ayah/${ayahNum}/ar.alafasy`)
        .then(
        res => (
          (this.ayahaAudio = res.data.audio), (this.ayahaAudioStatus = true)
        )
        )
        .catch(e => console.log(e))
        .finally(() => console.log(this));

    }else{
    this.getPage(this.$route.params.surah,Number(this.$route.params.id)+1);
      console.log('noneee');

    }
    //   if(t)
   
    },
        getPage(surah ,id ) {
          console.log(surah ,id);
          // numberOfAyahs
          var obj = this.meta.data.surahs.references[Number(surah) - 1];
            console.log("obj6666666666");
  console.log(obj);
          if(Number(this.ayahNumber) > Number(obj.numberOfAyahs)){
          var obj = this.meta.data.surahs.references[Number(surah)];
  console.log("obj");
  console.log(obj);
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
      //   .catch(e => console.log(e))
      //   .finally(() => console.log(this));
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
}


</style>
