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
});


Vue.filter('ConvertToArabicNumbers', (value) => {

  const arabicNumbers = '\u0660\u0661\u0662\u0663\u0664\u0665\u0666\u0667\u0668\u0669';
  return new String(value).replace(/[0123456789]/g, (d)=>{return arabicNumbers[d]});
  return value; 
});