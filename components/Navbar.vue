<template>
<div>
  <b-navbar toggleable="lg" type="dark" variant="info" >
    <b-navbar-brand href="#">
      <svg height="30pt" viewBox="0 0 512 512" width="30pt" xmlns="http://www.w3.org/2000/svg"><path d="m512 256c0 141.386719-114.613281 256-256 256s-256-114.613281-256-256 114.613281-256 256-256 256 114.613281 256 256zm0 0" fill="#06bf51"/><path d="m510.554688 283.269531-139.230469-139.230469-57.574219 89.53125-229.476562-9.582031 109.398437 109.398438-92.09375 69.402343 104.289063 104.289063c16.214843 3.21875 32.972656 4.921875 50.132812 4.921875 132.171875 0 240.9375-100.167969 254.554688-228.730469zm0 0" fill="#0d9b50"/><path d="m254.722656 278.078125-144.4375-80.882813 30.738282-54.011718 114.15625 64.96875 116.144531-64.113282 29.480469 53.402344zm0 0" fill="#fff"/><path d="m371.324219 144.039062-116.144531 64.113282.796874 68.941406 144.828126-79.652344zm0 0" fill="#e9edf5"/><path d="m84.273438 223.980469 17.304687-31.566407 326.15625 178.792969-17.304687 31.566407zm0 0" fill="#94572e"/><path d="m84.269531 371.230469 326.15625-178.792969 17.304688 31.570312-326.15625 178.789063zm0 0" fill="#94572e"/><g fill="#704021"><path d="m427.726562 371.222656-171.75-94.128906.023438 41.039062 154.421875 84.65625zm0 0"/><path d="m410.421875 192.421875-154.445313 84.671875.023438 41.039062 171.726562-94.144531zm0 0"/></g></svg>
    </b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav >
        <!-- <b-nav-item href="#">Link</b-nav-item>
        <b-nav-item href="#" disabled>Disabled</b-nav-item> -->
        <slot></slot>

      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <!-- <b-navbar-nav class="ml-auto">
        <b-nav-form>
          <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
          <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button> 
        </b-nav-form>




      </b-navbar-nav> -->
    </b-collapse>
  </b-navbar>
</div>
</template>
<script>
export default {
  methods: {
    changeSurah(){
     this.changSelectEdition(this.selectedEdition);

    }
  },
  watch: {
     editionSel: { 
     immediate:true,
     handler:function(newValue){
     this.selectedEdition = newValue;
    // this.getPage(this.$route.params.surah,this.$route.params.lang,obj.startPage);

       
     },
    },
  },
  props: {
    metaData:{},
    // edition:{},
    // changSelectEdition:{},
    // editionSel:''
  },
    computed: {

  },
  data() {
    return {
    }
  },
  
}
</script>

<style scoped>

.dropdown-item {
  font-family: unset !important;
  border: 1px solid rgb(172, 170, 170) !important;
  src: url("~/assets/Al Qalam Quran.ttf") !important;
}
@font-face {
  font-family: "Al Qalam Quran";
  src: url("~/assets/Al Qalam Quran.ttf");
  font-weight: bold;
  font-style: italic, oblique;
}
</style>