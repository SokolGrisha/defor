<template>
  <nav>
    <div class="nav-wrapper green darken-2 ">
      <div class="container">
        <div class="row">
          <div class="col s8">
            <a class="brand-logo">DeForest</a>
          </div>
          <div class="col s4 hide-on-small-only">
            <form>
              <div class="input-field">
                <input id="search" type="search" placeholder="Введите x и y координату для поиска">
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

<style scoped>
  nav {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
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
