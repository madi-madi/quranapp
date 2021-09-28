<template>
    <div class="container">
        <div class="row mt-4" v-show="loading">

            <div class="col">
                <div class="placeholder wave pr-1 pl-1">
                        <div class="line w-100" v-for="line in lines" :key="line" ></div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            lines: {
        type: Number,
        default: 17
      }
        },
        name: 'SkeletonLoader',
        data () {
            return {
                loading: true
            }
        },
        mounted(){
            // setTimeout(() => {
            //     this.setLoadingState(false)
            // }, 5000)
        },
        methods: {
            setLoadingState (value) {
                this.loading = value
            }
        }
    }
</script>

<style scoped lang="css">
    .placeholder {
	 /* margin: 15px; */
	 /* padding: 10px; */
	 border-radius: 5px;
}
 .placeholder.pulse div {
	 animation: pulse 1s infinite ease-in-out;
	 -webkit-animation: pulse 1s infinite ease-in-out;
}
 .placeholder.wave div {
	 animation: wave 1s infinite linear forwards;
	 -webkit-animation: wave 1s infinite linear forwards;
	 background: #f6f7f8;
	 background: linear-gradient(to right, #eee 8%, #ddd 18%, #eee 33%);
	 background-size: 800px 104px;
}
 .placeholder div {
	 background: #e8e8e8;
}
 .placeholder .square {
	 float: left;
	 width: 30px;
	 height: 30px;
	 margin: 0 0 10px;
}
 .placeholder .rectangle {
	 float: left;
	 width: 40px;
	 height: 30px;
	 margin: 0 0 10px;
}
 .placeholder .line {
	 height: 12px;
	 margin: 0 0 10px 50px;
	 width: 70%;
}
 .placeholder .circle {
	 float: left;
	 width: 40px;
	 height: 40px;
	 margin: 0 15px 10px 0;
	 border-radius: 40px;
}
 @keyframes pulse {
	 0% {
		 background-color: rgba(165, 165, 165, .1);
	}
	 50% {
		 background-color: rgba(165, 165, 165, .3);
	}
	 100% {
		 background-color: rgba(165, 165, 165, .1);
	}
}
 @-webkit-keyframes pulse {
	 0% {
		 background-color: rgba(165, 165, 165, .1);
	}
	 50% {
		 background-color: rgba(165, 165, 165, .3);
	}
	 100% {
		 background-color: rgba(165, 165, 165, .1);
	}
}
 @keyframes wave {
	 0% {
		 background-position: -468px 0;
	}
	 100% {
		 background-position: 468px 0;
	}
}
 @-webkit-keyframes wave {
	 0% {
		 background-position: -468px 0;
	}
	 100% {
		 background-position: 468px 0;
	}
}
 
</style>