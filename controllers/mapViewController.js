app.controller("MapViewController", ['$scope', 'mapOptionsService', function($scope, mapOptionsService) {

    var getMapOptionsObject = function() {
        var optionsObject = {};
        _.forIn(mapOptionsService.getAllModified(), function(option) {
            optionsObject[option.name] = option.value;
        });
        return optionsObject;
    };

    var options = getMapOptionsObject();
    map = new L.Map('map', options);

    // create the tile layer with correct attribution
    var osm = new L.TileLayer(options.url, options);

    map.addLayer(osm);

    var setOption = function(option) {
        switch(option.updateMethod) {
            case "mapProperty":
                toggleMapProperty(option);
                break;
            case "control":
                toggleControl(option);
                break;
            default:
                console.log('could not update');
                break;
        }
//        map._layersMinZoom = 11
//        map._layersMaxZoom = 13
    };

    var toggleMapProperty = function(option) {
        if (option.value) {
            map[option.name].enable();
        } else {
            map[option.name].disable();
        }
    };

    var toggleControl = function(option) {
        if (option.value) {
            map[option.name].addTo(map)
        } else {
            map[option.name].removeFrom(map);
        }
    };

    var updateMap = function() {
        var options = mapOptionsService.getState();

        _.forIn(options, function(option) {
            mapOptionsService.set(option.name, map[option.stateMethod]());
        });
    };

    $scope.$on('mapOptionChange', function() {
        var option = mapOptionsService.lastUpdatedOption();
        setOption(option);
    });

    map.on('moveend', function(e) {
        updateMap();
        mapOptionsService.broadcastChangedMap(options);
    });
}]);

