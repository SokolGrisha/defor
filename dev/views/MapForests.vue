<template>
  <div id="map" :watch="newMarkers" :watch2="showMarker"></div>
</template>

<script>
  module.exports = {
    data() {
      return {
        googleMarkers: {}
      }
    },
    computed: {
      newMarkers() {
        this.addMarkers(this.$store.state.newMarkers);
        return this.$store.state.newMarkers;
      },
      showMarker() {
        let data = this.$store.state.showMarker;
        if(!data) return;
        let marker = this.googleMarkers[data.hash];
        console.log(data.hash);
        this.map.setCenter(marker.getPosition());
        this.$store.dispatch('loadInfo', data.hash);
        marker.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(() => {
          marker.setAnimation(null);
        }, 1000);
        return marker;
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
            icon: markers[key].is_valid ? '../static/img/valid_marker.png' : '../static/img/not_valid_marker.png'
          });

          count++;
          setTimeout(() => {
            marker.visible = true;
            marker.setAnimation(google.maps.Animation.DROP);
          }, count*100);

          if(Object.keys(markers).length === 1)
            this.map.setCenter(marker.getPosition());


          marker.addListener('click', () => {
            this.$store.dispatch('loadInfo', key);
            marker.setAnimation(google.maps.Animation.BOUNCE);
            setTimeout(() => {
              marker.setAnimation(null);
            }, 1000);
          });
          this.googleMarkers[key] = marker;
        }
      },
      getLatLng(pos) {
        return {lat: pos.x, lng: pos.y};
      }
    },
    created() {
      window.initMap = () => {
        this.map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 58, lng: 95},
          zoom: 3,
          scrollwheel: false,
          navigationControl: false,
          mapTypeControl: false,
          scaleControl: false,
          draggable: true,
          mapTypeId: 'satellite',
          disableDefaultUI: true
        });

        this.$store.dispatch('loadMarkers');
      }
    }
  }
</script>

<style lang="css">
  #map {
      height: 100vh;
      width: 100vw;
  }
</style>
