<template>
  <div id="map"></div>
</template>

<script>
  const options = require('../options');

  module.exports = {
    data() {
      return {
        markers: []
      }
    },
    methods: {
      addMarkers(markers) {
        let count = 0;
        for(let key in markers) {
          let marker = new google.maps.Marker({
            position: this.getLatLng(markers[key]),
            map: this.map,
            visible: false,
            title: key,
            icon: '../static/img/marker.png'
          });

          count++;
          setTimeout(() => {
            marker.setAnimation(google.maps.Animation.DROP);
            setTimeout(() => {marker.visible = true}, 10);
          }, count*300);

          marker.addListener('click', () => {
            this.$router.push({ path: 'forest', query: { hash: key }})
          });
          this.markers.push(marker);
        }
      },
      getLatLng(pos) {
        return {lat: pos.x, lng: pos.y};
      },
      loadMarkers() {
        this.$http.get(options.api + '/get_points').then(response => {
          this.addMarkers(response.body);
        }, response => {
          Materialize.toast('Не удалось загрузить маркеры.', 3000);
        })
      }
    },
    mounted() {
      window.initMap = () => {
        this.map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 58, lng: 95},
          zoom: 3,
          scrollwheel: false,
          navigationControl: false,
          mapTypeControl: false,
          scaleControl: false,
          draggable: true,
          mapTypeId: 'hybrid',
          disableDefaultUI: true
        });

        this.loadMarkers();
      }
    }
  }
</script>

<style lang="css">
  #map {
    height: 100%;
  }
</style>
