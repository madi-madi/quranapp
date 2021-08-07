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
      //  template: "#select2-template",
        mounted: function() {
          var vm = this;
                  console.log('ffffffff');
            console.log(this.$refs+`.${vm.elm}`);
            console.log(this.$refs);
          $(this.$refs[vm.elm])
            // init select2
            .select2({ data: this.options })
            .val(this.value)
            .trigger("change")
            // emit event on change.
            .on("change", function() {
              vm.$emit("input", this.value);
            });
        },
        watch: {
          value: function(value) {
            // update value
            $(this.$el)
              .val(value)
              .trigger("change");
              this.changeSurah();
          },
          options: function(options) {
            // update options
            $(this.$el)
              .empty()
              .select2({ data: options });
          }
        },
        destroyed: function() {
          // $(this.$el)
          //   .off()
          //   .select2("destroy");
        }
    }
</script>

<style lang="scss" scoped>

</style>