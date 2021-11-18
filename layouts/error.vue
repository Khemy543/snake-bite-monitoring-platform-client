<template> 
    <div class=" row row justify-content-center align-items-center text-center">
    <div>
      <img :src="image" :alt="error.statusCode" class=" h-40 w-auto object-cover mx-auto"/>
      <div class="">
        {{error.message}}
      </div>
      <div class=" mt-5" v-if="error.statusCode !== 502">
        <nuxt-link to="/" 
          class="">
          back to home
        </nuxt-link>
      </div>
    </div>
  </div>

</template>
<script>
export default {
  props:['error'],
  layout:"auth",
  computed : {
    image(){
      return this.error.statusCode == 404 ? '/img/404 Error-rafiki.svg' 
      : this.error.statusCode == 500 ? '/img/Online learning-rafiki.svg'
      :'/img/404 Error Page not Found with people connecting a plug-rafiki.svg';
    }
  }
}
</script>