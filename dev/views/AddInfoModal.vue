<template>
  <div>
    <div id="add-info-modal" class="modal">
      <div class="modal-content">
        <h4>Новый маркер</h4>
        <div class="row">
            <div class="file-field input-field">
              <div class="btn">
                <span>Фотография</span>
                <input type="file" class="green" @change="onFileChange">
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
    <a class="btn-floating btn-large waves-effect waves-light red modal-trigger" href="#add-info-modal"><i class="material-icons">add</i></a>
  </div>
</template>

<script>
  const options = require('../options.json');

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

        $('#submitNewInfo').modal('close');
        this.$http.post(options.api + '/add_info', {
          x: this.x,
          y: this.y,
          date: +new Date,
          image: this.base64
        }).then(
          response =>
            Materialize.toast('Новый маркер создан!', 3000),

          response =>
            Materialize.toast('Не удалось создать новый маркер.', 3000)
        );
      },
      onFileChange(e) {
        var files = e.target.files || e.dataTransfer.files;
        if(!files.length) return;

        var reader = new FileReader();
        reader.onload = (e) => {
          this.base64 = e.target.result;
        };
        reader.readAsDataURL(files[0]);
      }
    },
    mounted() {
      $('.modal').modal();
    }
  }
</script>

<style scoped>
  a.btn-floating {
    position: absolute;
    bottom: 100px;
    right: 25px;
  }
</style>
