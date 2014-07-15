app.controller("MapViewController", ['$scope', 'mapOptionsService', function($scope, mapOptionsService) {

    var getMapOptionsObject = function() {
        return mapOptionsService.getMapOptionsObject();
    };

    var options = getMapOptionsObject();
    var map = new L.Map('map', options);

    // create the tile layer with correct attribution
    var osm = new L.TileLayer(options.url, options);

    map.addLayer(osm);

    var updateMap = function(option) {
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

    $scope.$on('mapOptionChange', function() {
        updateMap(mapOptionsService.lastUpdatedOption())
    });

    map.on('moveend', function(e) {
        var options = { zoom: map.getZoom(), zoomControl: map.zoomControl.getContainer() ? true : false }

        mapOptionsService.broadcastChangedMap(options);
    });
}]);

