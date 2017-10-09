const ethContract = require('./contract.json');
const EthAPI = require('./EthAPI');
const sha256 = require('sha256');
const axios = require('axios');

module.exports = {
  state: {
    ethAPI: new EthAPI(ethContract.adress, ethContract.contract),
    ethKey: '',
    ethAdress: '',
    rootApi: 'http://127.0.0.1:5000',
    loading: false,
    markers: {},
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
      state.markers = data;
    }
  },
  actions: {
    addInfo({state, commit}, {x, y, base64}) {
      let date = +new Date;
      let hash = sha256(base64+x+y+date);

      commit('loading', true);
      Materialize.toast('Создается новая запись в блокчейне', 3000);

      state.ethAPI.add({
        addHash: hash,
        key: state.ethKey,
        fromAdress: state.ethAdress,

        resolve: (data) => {
          axios.post(state.rootApi + '/add_info', {x, y, image: base64, date}).then(
            response => {
              Materialize.toast('Новый маркер создан!', 3000);
              commit('loading', false);
              commit('newMarkers', {[hash]: {x: +x, y: +y}});
            },
            response => {
              Materialize.toast('Не удалось создать новый маркер.', 3000);
              commit('loading', false);
            }
          );
        },
        reject: (err) => {
          Materialize.toast('Ошибка. Не получилось создать запись.', 3000);
        }
      });
    },
    loadInfo({commit, state}, hash) {
      state.ethAPI.check(hash, state.ethAdress).then((data) => {
        if(data) {
          commit('loading', true);
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
