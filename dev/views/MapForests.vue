<template>
  <div id="map" :watch="markers"></div>
</template>

<script>
  module.exports = {
    computed: {
      markers() {
        this.addMarkers(this.$store.state.markers);
        return this.$store.state.markers;
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
            marker.setAnimation(google.maps.Animation.Zo);
            marker.visible = true;
          }, count*300);

          if(Object.keys(markers).length === 1) {
            this.map.setCenter(marker.getPosition());
          }

          marker.addListener('click', () => {
            this.$store.dispatch('loadInfo', key);
            marker.setAnimation(google.maps.Animation.BOUNCE);
            setTimeout(() => {
              marker.setAnimation(null);
            }, 1000);
          });
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
          scrollwheel: false,
          navigationControl: false,
          mapTypeControl: false,
          scaleControl: false,
          draggable: true,
          mapTypeId: 'hybrid',
          disableDefaultUI: true
        });

        this.$store.dispatch('loadMarkers');
      }
    }
  }
</script>

<style lang="css">
  #map {
    height: 100%;
  }
  @media (max-width: 480px) {
    #map {
      margin-top: -50px;
    }
  }
</style>
