<template>
  <div>
    <div id="add-info-modal" class="modal">
      <div class="modal-content">
        <h4>Новый маркер</h4>
        <br>
        <div class="row">
          <form @submit.prevent="submitNewInfo">
            <div class="file-field input-field">
              <div class="btn green">
                <span>Фотография</span>
                <input type="file" @change="onFileChange" required>
              </div>
              <div class="file-path-wrapper">
                <input class="file-path validate" type="text">
              </div>
            </div>
            <div class="input-field сol s12">
              <input id="x-coord" v-model="x" required autocomplete="off" placeholder="Введите долготу">
            </div>
            <div class="input-field сol s12">
              <input id="y-coord" v-model="y" required autocomplete="off" placeholder="Введите широту">
            </div>

            <input type="checkbox" class="filled-in" id="is_add_hash" v-model="isAddHash"/>
            <label for="is_add_hash">Добавить хеш в блокчейн</label>
            <br>
            <br>
            <button class="btn waves-effect green">СОЗДАТЬ</button>
          </form>
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
        base64: '',
        x: '',
        y: '',
        isAddHash: true
      }
    },
    methods: {
      submitNewInfo() {
        if(this.x.match(/^-?\d+\.?\d*$/) && this.y.match(/^-?\d+\.?\d*$/)) {
          $('#add-info-modal').modal('close');
          this.$store.dispatch('addInfo', {base64: this.base64, y: +this.y, x: +this.x, isValid: this.isAddHash});
        } else {
          Materialize.toast('Некорректно указаны координаты', 3000);
        }
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
