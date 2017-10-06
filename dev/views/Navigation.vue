<template>
  <nav>
   <div class="nav-wrapper green darken-2">
     <div class="center-align">
       <a href="https://azbang.github.io/DeForestClient/www/" class="breadcrumb">DeForest</a>
       <a v-show="isForest" class="breadcrumb">{{hash}}</a>
     </div>
   </div>
 </nav>
</template>

<script>
  module.exports = {
    data() {
      return {
        isForest: false
      }
    },
    computed: {
      hash() {
        let hash = this.$route.query.hash;
        this.isForest = hash != null ? true : false;
        return hash;
      }
    }
  }
</script>
