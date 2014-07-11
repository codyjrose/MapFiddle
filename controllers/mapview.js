app.controller("MapViewController", ['$scope', 'mapOptionsService', function($scope, mapOptionsService) {
    var map;

    var getMapOptionsObject = function() {
        return mapOptionsService.getMapOptionsObject();
    };

    var initMap = function() {
        var options = getMapOptionsObject();
        window.map = map = new L.Map('map', options);

        // create the tile layer with correct attribution
        var osm = new L.TileLayer(options.url, options);

        // start the map in South-East England
        //map.setView(options.center, options.zoom);
        map.addLayer(osm);
    };

    var setOptionOnMap = function(option) {

        switch(option.label) {
            case "Zoom Control":
                if (option.value) {
                    map.zoomControl.addTo(map)
                } else {
                    map.zoomControl.removeFrom(map);
                }
                break;
            case "Zoom":
                map.setZoom(option.value);

        }
    };

    initMap();

    // Still working on updating options when the map has been updated.
    map.on('moveend', function(e) {
        var options = e.target.options;
        console.log(options);
        mapOptionsService.set("zoom", options.zoom);
    });

    $scope.$on('mapOptionChange', function() {
        console.log("From MapView Controller: ");
        console.log(mapOptionsService.lastUpdatedOption());

        setOptionOnMap(mapOptionsService.lastUpdatedOption())
    });



}]);

