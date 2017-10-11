const ethContract = require('./contract.json');
const EthAPI = require('./EthAPI');
const sha256 = require('sha256');
const axios = require('axios');

module.exports = {
  state: {
    ethAPI: new EthAPI(ethContract.adress, ethContract.contract),
    ethKey: '',
    ethAdress: '',
    rootApi: 'https://deforest.herokuapp.com',
    loading: false,
    markers: {},
    newMarkers: {},
    showMarker: null,
    info: {}
  },
  mutations: {
    loading(state, val) {
      state.loading = val;
    },
    setEthKey(state, key) {
      state.ethKey = key;
      state.ethAdress = state.ethAPI.getAdress(key);
    },
    setInfo(state, data) {
      state.info = data;
    },
    newMarkers(state, data) {
      for(let key in data) {
        state.markers[key] = data[key];
      }
      state.newMarkers = data;
    },
    showMarker(state, marker) {
      state.showMarker = marker;
    }
  },
  actions: {
    searchByCoords({state, commit}, req) {
      let result = req.match(/([0-9]+) ([0-9]+)/);
      if(!result) {
        Materialize.toast(`Неправильная запись поиска.`, 3000);
        return;
      }

      let x = result[1];
      let y = result[2];

      for(let key in state.markers) {
        let m = state.markers[key];
        if(Math.round(m.x) == Math.round(x) && Math.round(m.y) == Math.round(y)) {
          commit('showMarker', {x: m.x, y: m.y, hash: key});
          return;
        }
      }
      Materialize.toast(`По координатам x: ${x}, y: ${y} маркера не найдено`, 3000);
    },
    addInfoToServer({state, commit}, data) {
      axios.post(state.rootApi + '/add_info', data).then(
        response => {
          if(data.is_valid) Materialize.toast('Новый маркер создан!', 3000);
          else Materialize.toast('Эмулированный маркер создан!', 3000);

          if(data.is_valid) Materialize.toast('Подождите, пока хеш будет замайнен.', 3000);
          commit('loading', false);
          commit('newMarkers', {[data.hash]: {x: data.x, y: data.y}});
        },
        response => {
          Materialize.toast('Не удалось создать новый маркер.', 3000);
          commit('loading', false);
        }
      );
    },
    addInfo({state, commit, dispatch}, {x, y, base64, isValid}) {
      let date = +new Date;
      let hash = sha256(base64+x+y+date);

      commit('loading', true);
      if(isValid) {
        Materialize.toast('Создается новая запись в блокчейне', 3000);

        try {
          state.ethAPI.add({
            addHash: hash,
            key: state.ethKey,
            fromAdress: state.ethAdress,
            resolve: (data) => dispatch('addInfoToServer', {image: base64, date, x, y, hash, is_valid: true}),
            reject: (err) => Materialize.toast('Ошибка. Не получилось создать запись.', 3000)
          });
        } catch(e) {
          Materialize.toast('Ошибка. Скорее всего ключ указан не верно.', 3000);
          commit('loading', false);
        }
      } else {
        Materialize.toast('Эмулируем подмену данных (без добавления хеша в блокчейн)', 3000);
        dispatch('addInfoToServer', {image: base64, date, x, y, hash, is_valid: false});
      }
    },
    loadInfo({commit, state}, hash) {
      try {
        commit('loading', true);
        Materialize.toast('Проверяем хеш в блокчейне...', 3000);
        state.ethAPI.check(hash, state.ethAdress).then((data) => {
          if(data) {
            Materialize.toast('Хеш совпадает. Загружаем данные с сервера...', 3000);
            axios.get(state.rootApi + '/get_info', {params: {hash}}).then(response => {
              commit('setInfo', response.data);
              commit('loading', false);
            }, response => {
              Materialize.toast('Не удалось загрузить информацию.', 3000);
              commit('loading', false);
            });
          } else {
            Materialize.toast('Данные повреждены', 3000);
            commit('loading', false);
          }
        });
      } catch(e) {
        Materialize.toast('Ошибка. Скорее всего ключ указан не верно.', 3000);
        commit('loading', false);
      }
    },
    loadMarkers({commit, state}) {
      commit('loading', true);
      axios.get(state.rootApi + '/get_points').then(response => {
        commit('newMarkers', response.data);
        commit('loading', false);
        Materialize.toast('Маркеры загружены.', 3000);
      }, response => {
        Materialize.toast('Не удалось загрузить маркеры.', 3000);
        commit('loading', false);
      })
    }
  }
}
