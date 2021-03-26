var markersData = [
    {
        lat: 46.485895,
        lng: 30.723695,
        name: "<h3>г. Заречный</h3> <p>Белоярская АЭС</p>",
        address: "<ul class='list-participants'><li><p>237</p><span>участников</span></li><li><p>3945</p><span>заработано баллов</span></li><li><p>29</p><span>призов отправлено</span></li></ul>",

    }
];

var map, infoWindow;

function initMap() {
    var coordinates = new google.maps.LatLng(50.441721, 30.635832);
    var mapOptions = {
        center: coordinates,
        zoom: 8,
        scrollwheel: false,
        disableDefaultUI: false,
        styles: [
            {
                "featureType": "all",
                "elementType": "all",
                "stylers": [
                    {
                        "invert_lightness": true
                    },
                    {
                        "saturation": 10
                    },
                    {
                        "lightness": 30
                    },
                    {
                        "gamma": 0.5
                    },
                    {
                        "hue": "#435158"
                    }
                ]
            }
        ]
    };

    map = new google.maps.Map(document.getElementById("map"), mapOptions);

    infoWindow = new google.maps.InfoWindow();

    google.maps.event.addListener(map, "click", function () {
        infoWindow.close();
    });

    // Определяем границы видимой области карты в соответствии с положением маркеров
    var bounds = new google.maps.LatLngBounds();

    for (var i = 0; i < markersData.length; i++) {

        var latLng = new google.maps.LatLng(markersData[i].lat, markersData[i].lng);
        var name = markersData[i].name;
        var address = markersData[i].address;

        addMarker(latLng, name, address);

        // Расширяем границы нашей видимой области, добавив координаты нашего текущего маркера
        bounds.extend(latLng);
    }

    // Автоматически масштабируем карту так, чтобы все маркеры были в видимой области карты
    map.fitBounds(bounds);

}

google.maps.event.addDomListener(window, "load", initMap);

function addMarker(latLng, name, address, buttonWrapper) {
    var marker = new google.maps.Marker({
        position: latLng,
        map: map,
        animation: google.maps.Animation.DROP,
        title: name,
        icon: 'img/marker1.svg'
    });

    google.maps.event.addListener(marker, "click", function () {

        $(this).addClass('clicked');
        var contentString = '<div class="infowindow"> <div class="infowindow-header">' + name + '</div>' +
            '<div class="infowindow-body">' + address + '</div></div>';

        infoWindow.setContent(contentString);
        infoWindow.open(map, marker);

    });
}
