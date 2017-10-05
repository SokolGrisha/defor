<template>
  <div id="map"></div>
</template>

<script>
  module.exports = {
    mounted() {
      window.initMap = () => {
        this.map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 58, lng: 95},
          zoom: 3,
          gestureHandling: 'none',
          mapTypeId: 'hybrid',
          disableDefaultUI: true
        });
      }
    }
  }
</script>

<style lang="css">
  #map {
    height: 100%;
  }
</style>
