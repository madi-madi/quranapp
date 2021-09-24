<template >
    <div>
        <select :ref="elm" class="col m-2" @change="changeSurah()" >
            <slot></slot>
        </select>
    </div>
</template>

<script>
    export default {
              props: {options:'',
               value:null,
               changeSurah:{},
               elm:''
              },
        mounted: function() {
          var vm = this;
          $(this.$refs[vm.elm])
            .select2({ data: this.options ,
            width: '100%' 
            })
            .val(this.value)
            .trigger("change")
            .on("change", function() {
              vm.$emit("input", this.value);
            });
        },
        watch: {
          value: function(value) {
            self =this;
            $(this.$refs[self.elm])
              .val(value)
              .trigger("change");
              this.changeSurah();
          },
          options: function(options) {
            self =this;
            $(this.$refs[self.elm])
              .empty()
              .select2({ data: options });
          }
        },
        destroyed: function() {
          self=this;
          $(this.$refs[self.elm])
            .off()
            .select2("destroy");
        }
    }
</script>

<style lang="css" scoped>
.select2 {
    width: 100% !important;
}
</style>