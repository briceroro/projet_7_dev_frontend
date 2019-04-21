// fonction intMap sert  instancier google maps api , streetview api  et places ap.
//fonction de geolocalisation qui sert a définir l'emplacment de l'utilisateur
//maps api permets d'afficher la carte maps et de lancer l'api de google
//streetview api sert a recuperer l'image du restanrant dans le modal
//places api sert a recuperer les nouveau restaurant et les afficher dans la map


function initMap() {



    let latlng = {
        lat: 48.88256990000001,
        lng: 2.3335956999999325
    };


    //                ======================geolocalisation user ===================
    //                ==============================================================


    P7.geolocationUser = function () {
        if (navigator.geolocation) {

            function userPosition(position) {
                latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                let userMarker = new google.maps.Marker({
                    icon: 'images/user.png',
                    position: latlng,
                    zoom: 13,
                    map: map,
                    title: "Vous êtes ici"
                });
                map.panTo(latlng);
            }

            function erreurPosition(error) {


                var info = "Erreur lors de la géolocalisation : ";
                switch (error.code) {
                    case error.TIMEOUT:
                        info += "Timeout !";
                        break;
                    case error.POSITION_UNAVAILABLE:
                        info += "La position n’a pu être déterminée";
                        break;
                    case error.UNKNOWN_ERROR:
                        info += "Erreur inconnue";
                        break;
                }
            }

            navigator.geolocation.getCurrentPosition(userPosition, erreurPosition);

        } else {

            alert("Ce navigateur ne supporte pas la géolocalisation");
        }
    }
    P7.geolocationUser();


    //                 ===============================maps api==========================
    //                 =================================================================


    let map = new google.maps.Map(
        document.getElementById('map'), {
            zoom: 13,
            center: latlng
        });


    const geocoder = new google.maps.Geocoder;

    function geocodeLatLng(geocoder, map) {

        const latlngNewResto = {
            lat: P7.newLat,
            lng: P7.newLng
        };

        geocoder.geocode({
            'location': latlngNewResto
        }, function (results, status) {
            if (status === 'OK') {
                P7.newAdress = results[0].formatted_address;

            }
        });
    }



    P7.newListRestoJSON = google.maps.event.addListener(map, 'click', function (event) {

        P7.newLat = event.latLng.lat();
        P7.newLng = event.latLng.lng();
        geocodeLatLng(geocoder, map);
        new formNewResto();
    });



    P7.MarkersListRestoJSON = function Markers() {
        for (let i = 0; i < P7.ListResto.length; i++) {
            const restoPosition = {

                lat: P7.ListResto[i].lat,
                lng: P7.ListResto[i].long
            };
            P7.MarkersListRestoJSON[i] = new google.maps.Marker({

                position: restoPosition,
                map: map,
                title: P7.ListResto[i].restaurantName
            });

            P7.MarkersListRestoJSON[i].addListener('click', function () {
                P7.ListResto.numberResto = i;
                P7.numberRatings = P7.ListResto[i].ratings.length;
                new modal(P7.ListResto, List, "listJSON", P7.ListResto.numberResto);
            });
        }
    }

    //               =========================streetview api==========================
    //               ==================================================================


    P7.streetView = function (lat, lon) {
        P7.streetView.url = "https://maps.googleapis.com/maps/api/streetview?size=300x200&location=" + lat + "," + lon +
            "&key=YOURKEY";
        return P7.streetView.url;
    }


    //                =========================== places api=============================
    //                 ===================================================================


    function initPlaces() {

        P7.places = {};
        P7.places.newplaces = [];
        P7.places.restoPlace = [];
        P7.places.markers = [];

        P7.places.request = {
            location: latlng,
            radius: '300',
            type: ['restaurant']
        };

        P7.places.service = new google.maps.places.PlacesService(map);
        P7.places.service.nearbySearch(P7.places.request, nearby);
    }
    initPlaces();

    function newPlaces() {

        P7.places.service = new google.maps.places.PlacesService(map);
        P7.places.service.nearbySearch(P7.places.NewRequest, nearby);

    }


    function nearby(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {

            for (let i = 0; i < 5; i++) {

                P7.places.newplaces.push(results[i].place_id);

                P7.places.requestDetails = {
                    placeId: P7.places.newplaces[i],
                    fields: ['name', 'rating', 'reviews', 'vicinity', 'geometry']
                };

                P7.places.service.getDetails(P7.places.requestDetails, nearbyDetails);
                P7.MarkersListRestoJSON();

            }
        }
    }

    function nearbyDetails(place, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {


            P7.places.placeRestoRatings = [];
            for (let i = 0; i < place.reviews.length; i++) {
                P7.places.placeRestoRatings.push({
                    "stars": place.reviews[i].rating,
                    "comment": place.reviews[i].text
                })
            }

            P7.places.restoPlace.push({
                "restaurantName": place.name,
                "address": place.vicinity,
                "lat": place.geometry.viewport.ma.l,
                "long": place.geometry.viewport.ga.l,
                "ratings": P7.places.placeRestoRatings
            })

            delete P7.places.placeRestoRatings;
        }

        P7.places.restoPlace.Marker = new google.maps.Marker({
            icon: 'images/placesResto.png',
            position: place.geometry.location,
            zoom: 13,
            map: map,
            title: place.name
        });


        for (let i = 0; i < P7.places.restoPlace.length; i++) {
            P7.places.restoPlace.Marker.addListener('click', function () {
                P7.places.numberResto = i;
                P7.places.numberRatings = P7.places.restoPlace[i].ratings.length;
                new modal(P7.places.restoPlace, ListPlace, "ListMaps", P7.places.numberResto);
            });
        }
        P7.places.markers.push(P7.places.restoPlace.Marker)
        ListPlace.innerHTML = "";
        new ListRestoDom(P7.places.restoPlace, ListPlace, "ListMaps", P7.places.numberResto);

    }

    function clearMarkersPlaces() {

        for (i in P7.places.markers) {
            P7.places.markers[i].setMap(null);
        }
    }

    google.maps.event.addListener(map, 'rightclick', function (event) {
        clearMarkersPlaces();

        delete P7.places;
        P7.places = {};
        P7.places.newplaces = [];
        P7.places.restoPlace = [];
        P7.places.markers = [];

        P7.places.NewRequest = {
            location: {
                lat: event.latLng.lat(),
                lng: event.latLng.lng()
            },
            radius: '300',
            type: ['restaurant']
        };

        newPlaces();
    });
}
