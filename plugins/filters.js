import Vue from 'vue'

Vue.filter('textColorNameAllah', (value) => {
  var res = value;
  if(res != ''){
    var keywords = ["رَبِّهِمْ","لِلَّهِ","بِاللَّهِ","اللَّهِ","رَبِّكَ","رَبُّكَ","رَبِّنَا","بِرَبِّ","رَبِّكَ","رَبِّ","إِلَٰهِ","۩"];
    keywords.forEach(element => {
      var sp = `<span class="text-danger">${element}</span>`;
         res = res.toString().replace(element, sp);
      
    });
  }
  
  return res; 
})