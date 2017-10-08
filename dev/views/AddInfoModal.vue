<template>
  <div>
    <div id="add-info-modal" class="modal">
      <div class="modal-content">
        <h4>Новый маркер</h4>
        <form class="col s12" @submit.prevent="submitNewInfo">
          <div class="input-field">
            <input id="base64" v-model="base64" autocomplete="off" class="validate" data-error="wrong" placeholder="Введите картинку в base64" data-success="right">
          </div>
          <div class="input-field">
            <input id="x-coord" v-model="x" autocomplete="off" class="validate" data-error="wrong" placeholder="Введите долготу" data-success="right">
          </div>
          <div class="input-field">
            <input id="y-coord" v-model="y" autocomplete="off" class="validate" data-error="wrong" placeholder="Введите широту" data-success="right">
          </div>
          <button type="submit">СОЗДАТЬ</button>
        </form>
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
        base64: '',
        x: 0,
        y: 0
      }
    },
    methods: {
      submitNewInfo() {
        let date = new Date;

        $('#submitNewInfo').modal('close');
        this.$http.post(options.api + '/add_info', {x: this.x, y: this.y, date, image: this.base64}).then(response => {
          Materialize.toast('Новый маркер создан!', 3000);
        }, response => {
          Materialize.toast('Не удалось создать новый маркер.', 3000);
        })
      }
    },
    mounted() {
      $('.modal').modal();
      $('#add-info-modal').modal('open');
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
