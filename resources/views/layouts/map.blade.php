<div id="map"></div>
<script>
    function initMap() {
        var uluru = {
            lat: {{$lat}}, lng: {{$lng }}
        };
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 10,
            center: uluru
        });
        var marker = new google.maps.Marker({
            position: uluru,
            map: map
        });
    }
</script>
<script async defer
        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBMWjSqvLxglIo1NJBw7hEsph-NlzZDbFQ&callback=initMap">
</script>