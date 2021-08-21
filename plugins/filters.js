import Vue from 'vue'

Vue.filter('textColorNameAllah', (value) => {
  var res = value;
  if(res != ''){
    var keywords = ["رَبِّهِمْ","رَبِّ","لِلَّهِ","اللَّهِ"];
    keywords.forEach(element => {
      var sp = `<span class="text-danger">${element}</span>`;
         res = res.toString().replace(element, sp);
      
    });
    // var keywo = "اللَّهِ";
  }
  
  return res; 
})