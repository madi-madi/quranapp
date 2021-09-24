<template>
       <div class="col frame h-100 p-3" v-if="surah">
          <!-- <h1 v-if="surah">{{surah.name}}</h1> -->
          <!-- <b-card bg-variant="white" :header="surah.name" text-variant="dark" class="text-center h-100  border border-warning p-2  mt-4 ">
        <b-card-text class="h-100 mr-2 ml-2 text-justify"> -->

          <div class="col p-content pb-2 pt-3 mt-1 mb-4 text-justify">
            <template >
              <div v-for="(sur , index) in surah" :key="index">
              <p class=""
              :class="{'frame-name-surah text-center':sur[0].numberInSurah === 1
                ,'mt-4':index ==  Object.keys(surah)[0]
                ,'mt-3':index !=  Object.keys(surah)[0]
                }"
               v-once>
              {{ meta.data.surahs.references[index-1].text }}
              </p>
            <span class="p-0 " v-for="(ayah, index) in sur" :key="index">
              <p class="text-center mb-0" v-if="ayah.numberInSurah === 1"
                v-html="$options.filters.textColorNameAllah(basmala)"
              >
              </p>

              <template >
                <span  :class="{'ayaha-active-color':ayah.number === ayahNumber}"
                v-html="$options.filters.textColorNameAllah(ayah.numberInSurah === 1?ayah.text.split(basmala)[1]:ayah.text)"
                >
                  
                  </span>
                <!-- <b-badge variant="warning">{{ ayah.numberInSurah }}</b-badge> -->
              <svg width="6%" height="6%" viewBox="0 -400 1250 1625" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
              <circle r="605" stroke="#000" cx="625" cy="421" stroke-width="30" fill="#d5d554"/>

              <circle r="510" stroke="#000" cx="625" cy="421" stroke-width="30" fill="#ffffff"/>
              <text x="50%" y="-25%" text-anchor="middle" stroke="#51c5cf" stroke-width="2px" font-weight="bold" font-size="650px" dy="1.6em">{{ ayah.numberInSurah | ConvertToArabicNumbers }}</text>
              <g id="header">
              <path d="m1006.2,46.902c96.075,45.999,160.74,23.972,201.66-30.111-83.3-13.413-157.3-96.153-229.57-148.02-157.22-112.81-249.67-57.8-353.51-236.32-103.83,178.49-196.28,123.48-353.5,236.29-72.29,51.864-146.26,134.6-229.5,148.02,40.928,54.082,105.59,76.11,201.66,30.11,107.34,116.17,142.73-192.06,381.34,10.364,238.62-202.39,274.01,105.84,381.38-10.33z" stroke="#000" stroke-width="30" fill="#d5d554"/>
              <circle r="69" cx="625" cy="-127" fill="#000"/>


              <path id="repu" d="M466.92-110.36c-75.47,27.435-114,46.932-165.42,83.529" stroke="#000" stroke-linecap="round" stroke-width="43"/>
              <use xlink:href="#repu" transform="translate(1248,0) scale(-1,1)"/>
              </g>
              <use xlink:href="#header" transform="translate(0,825) scale(1,-1)"/>
              </svg>
        
              </template>
            </span>
              </div>
             
            </template>
          
              <div class="col text-center">
                                <b-badge variant="info" class=" 
                ">{{surahPage.number}}</b-badge>
              </div>

          </div>
          <!-- </b-card-text>
      </b-card>  -->
        </div>
</template>

<script>
    export default {
  data () {
    return {
      basmala:"بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
    }
  },
  computed: {
    // a computed getter
    fillterd() {
      // `this` points to the vm instance
      // return  this.surah.ayahs.reduce((r, a) => {
      // r[a.surah.number] = [...r[a.surah.number] || [], a];
      // return r;
      // }, {});
    }
  },
  props: {
      surah:{},
      surahPage:{},
      meta:null,
      ayahNumber:null
  },
        
    }
</script>

<style lang="css" scoped>
.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
.card-body {
  padding: 0px !important;
  line-height: 2;
}

.frame {
  background-image: url(~/assets/8fac60ef09ce30114277835318b75fa3.png);
  background-size: 100% 100%;
  font-family: "Al Qalam Quran";
  direction: rtl;
  font-size: 12pt;
  /* src: url("~/assets/AlQalamQuran.ttf"); */
  /* /home/dev-ibrahim/Desktop/quran/assets/font-quran/xb_zar-webfont.ttf */
}
@font-face {
  font-family: "Al Qalam Quran";
  src: url("~/assets/ar-Othmani.ttf");
   /* font-weight: bold;  */
  /* font-style: italic, oblique; */
}

.ayaha-active-color{
    background-color: #6ab04c !important;
    color: #fff !important;
}

.frame-name-surah {
  background-image: url(~/assets/8fac60ef09ce30114277835318b75fa3.png);
  background-size: 100% 100%;
  /* /home/dev-ibrahim/Desktop/quran/assets/font-quran/xb_zar-webfont.ttf */
}
.p-content{
  padding-left: 10%;
  padding-right: 10%;
}
</style>