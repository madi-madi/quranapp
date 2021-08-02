<template>
       <div class="col col-lg-4 col-md-6 col-sm-12 frame h-100 " v-if="surah">
          <!-- <h1 v-if="surah">{{surah.name}}</h1> -->
          <!-- <b-card bg-variant="white" :header="surah.name" text-variant="dark" class="text-center h-100  border border-warning p-2  mt-4 ">
        <b-card-text class="h-100 mr-2 ml-2 text-justify"> -->

          <div class="col pr-5 pl-5 pb-2 pt-3 mt-4 mb-5 text-justify">
            <template >
              <div v-for="(sur , index) in fillterd" :key="index">
              <p class="mt-4 " v-once>
              {{ meta.data.surahs.references[index-1].text }}
            </p>
            <span class="p-0" v-for="(ayah, index) in sur" :key="index">
              <p v-if="ayah.numberInSurah === 1">
                {{ ayah.text }}
                <!-- <b-badge variant="warning">{{ ayah.numberInSurah }}</b-badge> -->
              <svg width="6%" height="6%" viewBox="0 -400 1250 1625" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
              <circle r="605" stroke="#000" cx="625" cy="421" stroke-width="30" fill="#d5d554"/>

              <circle r="510" stroke="#000" cx="625" cy="421" stroke-width="30" fill="#ffffff"/>
              <text x="50%" y="-25%" text-anchor="middle" stroke="#51c5cf" stroke-width="2px"  font-weight="bold" font-size="650px" dy="1.6em">{{ ayah.numberInSurah }}</text>
              <g id="header">
              <path d="m1006.2,46.902c96.075,45.999,160.74,23.972,201.66-30.111-83.3-13.413-157.3-96.153-229.57-148.02-157.22-112.81-249.67-57.8-353.51-236.32-103.83,178.49-196.28,123.48-353.5,236.29-72.29,51.864-146.26,134.6-229.5,148.02,40.928,54.082,105.59,76.11,201.66,30.11,107.34,116.17,142.73-192.06,381.34,10.364,238.62-202.39,274.01,105.84,381.38-10.33z" stroke="#000" stroke-width="30" fill="#d5d554"/>
              <circle r="69" cx="625" cy="-127" fill="#000"/>


              <path id="repu" d="M466.92-110.36c-75.47,27.435-114,46.932-165.42,83.529" stroke="#000" stroke-linecap="round" stroke-width="43"/>
              <use xlink:href="#repu" transform="translate(1248,0) scale(-1,1)"/>
              </g>
              <use xlink:href="#header" transform="translate(0,825) scale(1,-1)"/>
              </svg>
              </p>

              <template v-else>
                <span  :class="{'ayaha-active-color':ayah.number === ayahNumber}">{{ ayah.text }}</span>
                <!-- <b-badge variant="warning">{{ ayah.numberInSurah }}</b-badge> -->
              <svg width="6%" height="6%" viewBox="0 -400 1250 1625" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
              <circle r="605" stroke="#000" cx="625" cy="421" stroke-width="30" fill="#d5d554"/>

              <circle r="510" stroke="#000" cx="625" cy="421" stroke-width="30" fill="#ffffff"/>
              <text x="50%" y="-25%" text-anchor="middle" stroke="#51c5cf" stroke-width="2px" font-weight="bold" font-size="650px" dy="1.6em">{{ ayah.numberInSurah }}</text>
              <g id="header">
              <path d="m1006.2,46.902c96.075,45.999,160.74,23.972,201.66-30.111-83.3-13.413-157.3-96.153-229.57-148.02-157.22-112.81-249.67-57.8-353.51-236.32-103.83,178.49-196.28,123.48-353.5,236.29-72.29,51.864-146.26,134.6-229.5,148.02,40.928,54.082,105.59,76.11,201.66,30.11,107.34,116.17,142.73-192.06,381.34,10.364,238.62-202.39,274.01,105.84,381.38-10.33z" stroke="#000" stroke-width="30" fill="#d5d554"/>
              <circle r="69" cx="625" cy="-127" fill="#000"/>


              <path id="repu" d="M466.92-110.36c-75.47,27.435-114,46.932-165.42,83.529" stroke="#000" stroke-linecap="round" stroke-width="43"/>
              <use xlink:href="#repu" transform="translate(1248,0) scale(-1,1)"/>
              </g>
              <use xlink:href="#header" transform="translate(0,825) scale(1,-1)"/>
              </svg>
                <svg
                  v-if="ayah.sajda"
                  width="20"
                  height="20"
                  id="svg874"
                  style="enable-background:new 0 0 512 512;"
                  version="1.1"
                  viewBox="0 0 32 32"
                  xml:space="preserve"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:cc="http://creativecommons.org/ns#"
                  xmlns:dc="http://purl.org/dc/elements/1.1/"
                  xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
                  xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
                  xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
                  xmlns:svg="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                >
                  <g id="layer5">
                    <g id="path212">
                      <path
                        d="M6,30c-0.6,0-1-0.4-1-1V3c0-0.6,0.4-1,1-1s1,0.4,1,1v26C7,29.6,6.6,30,6,30z"
                      />
                    </g>
                    <g id="path1019">
                      <path
                        d="M26,30c-0.6,0-1-0.4-1-1V3c0-0.6,0.4-1,1-1s1,0.4,1,1v26C27,29.6,26.6,30,26,30z"
                      />
                    </g>
                    <g id="path1021">
                      <path
                        d="M26,7H6C5.4,7,5,6.6,5,6s0.4-1,1-1h20c0.6,0,1,0.4,1,1S26.6,7,26,7z"
                      />
                    </g>
                    <g id="path1023">
                      <path
                        d="M26,27H6c-0.6,0-1-0.4-1-1s0.4-1,1-1h20c0.6,0,1,0.4,1,1S26.6,27,26,27z"
                      />
                    </g>
                    <g id="path1025">
                      <path
                        d="M10,7C9.4,7,9,6.6,9,6V3c0-0.6,0.4-1,1-1s1,0.4,1,1v3C11,6.6,10.6,7,10,7z"
                      />
                    </g>
                    <g id="path1027">
                      <path
                        d="M18,7c-0.6,0-1-0.4-1-1V3c0-0.6,0.4-1,1-1s1,0.4,1,1v3C19,6.6,18.6,7,18,7z"
                      />
                    </g>
                    <g id="path1035">
                      <path
                        d="M14,7c-0.6,0-1-0.4-1-1V3c0-0.6,0.4-1,1-1s1,0.4,1,1v3C15,6.6,14.6,7,14,7z"
                      />
                    </g>
                    <g id="path1037">
                      <path
                        d="M22,7c-0.6,0-1-0.4-1-1V3c0-0.6,0.4-1,1-1s1,0.4,1,1v3C23,6.6,22.6,7,22,7z"
                      />
                    </g>
                    <g id="path1039">
                      <path
                        d="M10,30c-0.6,0-1-0.4-1-1v-3c0-0.6,0.4-1,1-1s1,0.4,1,1v3C11,29.6,10.6,30,10,30z"
                      />
                    </g>
                    <g id="path1041">
                      <path
                        d="M18,30c-0.6,0-1-0.4-1-1v-3c0-0.6,0.4-1,1-1s1,0.4,1,1v3C19,29.6,18.6,30,18,30z"
                      />
                    </g>
                    <g id="path1043">
                      <path
                        d="M14,30c-0.6,0-1-0.4-1-1v-3c0-0.6,0.4-1,1-1s1,0.4,1,1v3C15,29.6,14.6,30,14,30z"
                      />
                    </g>
                    <g id="path1045">
                      <path
                        d="M22,30c-0.6,0-1-0.4-1-1v-3c0-0.6,0.4-1,1-1s1,0.4,1,1v3C23,29.6,22.6,30,22,30z"
                      />
                    </g>
                    <g id="path1047">
                      <path
                        d="M26,11H6c-0.6,0-1-0.4-1-1s0.4-1,1-1h20c0.6,0,1,0.4,1,1S26.6,11,26,11z"
                      />
                    </g>
                    <g id="path1049">
                      <path
                        d="M26,23H6c-0.6,0-1-0.4-1-1s0.4-1,1-1h20c0.6,0,1,0.4,1,1S26.6,23,26,23z"
                      />
                    </g>
                    <g id="path1051">
                      <path
                        d="M11,23c-0.6,0-1-0.4-1-1v-6c0-2.6,4.4-3.7,5.8-4c0.5-0.1,1.1,0.2,1.2,0.8c0.1,0.5-0.2,1.1-0.8,1.2c-2.1,0.4-4.2,1.4-4.2,2    v6C12,22.6,11.6,23,11,23z"
                      />
                    </g>
                    <g id="path1053">
                      <path
                        d="M21,23c-0.6,0-1-0.4-1-1v-6c0-0.6-2.1-1.6-4.2-2c-0.5-0.1-0.9-0.6-0.8-1.2c0.1-0.5,0.6-0.9,1.2-0.8c1.4,0.3,5.8,1.4,5.8,4    v6C22,22.6,21.6,23,21,23z"
                      />
                    </g>
                  </g>
                </svg>
              </template>
            </span>
              </div>
             
            </template>
          
              <div class="col text-center">
                                <b-badge variant="info" class=" 
                ">{{surah.number}}</b-badge>
              </div>

          </div>
          <!-- </b-card-text>
      </b-card>  -->
        </div>
</template>

<script>
    export default {
  computed: {
    // a computed getter
    fillterd() {
      // `this` points to the vm instance
      return  this.surah.ayahs.reduce((r, a) => {
      r[a.surah.number] = [...r[a.surah.number] || [], a];
      return r;
      }, {});
    }
  },
  props: {
      surah:{},
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
  src: url("~/assets/Al Qalam Quran.ttf");
  /* /home/dev-ibrahim/Desktop/quran/assets/font-quran/xb_zar-webfont.ttf */
}
@font-face {
  font-family: "Al Qalam Quran";
  src: url("~/assets/Al Qalam Quran.ttf");
  /* font-weight: bold; */
  /* font-style: italic, oblique; */
}

.ayaha-active-color{
    background-color: #6ab04c !important;
    color: #fff !important;
}
</style>