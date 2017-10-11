<template>
  <nav>
    <div class="nav-wrapper green">
      <div class="container">
        <div class="row">
          <div class="col s8">
            <a class="brand-logo">DeForest</a>
          </div>
          <div class="col s4 hide-on-small-only">
            <form @submit.prevent="searchCoords">
              <div class="input-field">
                <input id="search" type="search" v-model="search" autocomplete="off" placeholder="Введите x и y координату для поиска">
                <label class="label-icon" for="search"><i class="material-icons">search</i></label>
                <i class="material-icons">close</i>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
  module.exports = {
    data() {
      return {
        search: ''
      }
    },
    methods: {
      searchCoords() {
        this.$store.dispatch('searchByCoords', this.search);
      }
    }
  }
</script>

<style scoped>
  nav {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
  }
  #search:focus {
    border-bottom: none;
    -webkit-box-shadow: none;
    box-shadow: none;
  }
  .container {
    height: 100%;
  }
  .brand-logo {
    font-weight: 200;
  }
  form {
    height: 64px;
  }
  label i {
    margin-top: -10px;
  }
</style>
