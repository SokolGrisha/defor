<template>
  <div id="map"></div>
</template>

<script>
  const markers = require('../markers');

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
            icon: 'img/marker.png'
          });

          count++;
          setTimeout(() => {
            marker.visible = true;
            marker.setAnimation(google.maps.Animation.DROP);
          }, count*200);

          this.markers.push(marker);
        }
      },
      getLatLng(pos) {
        return {lat: pos.x, lng: pos.y};
      }
    },
    mounted() {
      window.initMap = () => {
        this.map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 58, lng: 95},
          zoom: 3,
          gestureHandling: 'none',
          mapTypeId: 'hybrid',
          disableDefaultUI: true
        });

        this.addMarkers(markers);
      }
    }
  }
</script>

<style lang="css">
  #map {
    height: 100%;
  }
</style>
