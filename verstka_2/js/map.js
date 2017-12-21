// When the window has finished loading create our google map below

function mapInit() {
    // Basic options for a simple Google Map
    // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
    var bounds = new google.maps.LatLngBounds();
    var center = new google.maps.LatLng(55.803506, 37.552100);
    bounds.extend(center);
    var loc = new google.maps.LatLng(55.803506, 37.549934);
    bounds.extend(loc);
    var mapOptions = {
        // How zoomed in you want the map to start at (always required)
        zoom: 17,
        scrollwheel: false,
        streetViewControl: false,
        panControl: true,
        panControlOptions: {
            position: google.maps.ControlPosition.TOP_RIGHT
        },
        zoomControl: true,
        zoomControlOptions: {
            position: google.maps.ControlPosition.LEFT_BOTTOM
        },

        // The latitude and longitude to center the map (always required)
        center: center, // New York
    };

    // Get the HTML DOM element that will contain your map 
    // We are using a div with id="map" seen below in the <body>
    var mapElement = document.getElementById('map');

    var map = new google.maps.Map(mapElement, mapOptions);


    var marker = new google.maps.Marker({
        position: loc,
        map: map,
        // icon: {
        //     url: '../img/point.png',
        //     size: new google.maps.Size(47, 71),
        //     origin: new google.maps.Point(0, 0),
        //     anchor: new google.maps.Point(23, 71)
        // },
        title: 'Бизнес-центр Аэропорт'
    });

    //map.fitBounds(bounds);//autozoom
}
mapInit();