<template>
  <div>
    <div id="add-info-modal" class="modal">
      <div class="modal-content">
        <h4>Новый маркер</h4>
        <br>
        <div class="row">
            <div class="file-field input-field">
              <div class="btn green">
                <span>Фотография</span>
                <input type="file" @change="onFileChange">
              </div>
              <div class="file-path-wrapper">
                <input class="file-path validate" type="text">
              </div>
            </div>
            <div class="input-field сol s12">
              <input id="x-coord" v-model="x" autocomplete="off" placeholder="Введите долготу">
            </div>
            <div class="input-field сol s12">
              <input id="y-coord" v-model="y" autocomplete="off" placeholder="Введите широту">
            </div>
            <button class="btn waves-effect green" @click="submitNewInfo">СОЗДАТЬ</button>
          </div>
      </div>
    </div>
    <a class="btn-floating btn-large waves-effect waves-light green modal-trigger" href="#add-info-modal"><i class="material-icons">add</i></a>
  </div>
</template>

<script>
  module.exports = {
    data() {
      return {
        base64: '', x: '', y: ''
      }
    },
    methods: {
      submitNewInfo() {
        if(!this.base64 || !this.x || !this.y) {
          Materialize.toast('Заполнены не все поля.', 1000);
          return;
        }

        $('#add-info-modal').modal('close');
        this.$store.dispatch('addInfo', {base64: this.base64, y: this.y, x: this.x});
      },
      onFileChange(e) {
        var files = e.target.files || e.dataTransfer.files;
        if(!files.length) return;

        var reader = new FileReader();
        reader.onload = (e) => {
          this.$store.commit('loading', false);
          this.base64 = e.target.result;
        };
        this.$store.commit('loading', true);
        reader.readAsDataURL(files[0]);
      }
    },
    mounted() {
      $('#add-info-modal').modal({
        endingTop: '20%'
      });
    }
  }
</script>

<style scoped>
  a.btn-floating {
    position: absolute;
    bottom: 110px;
    right: 25px;
  }
</style>
