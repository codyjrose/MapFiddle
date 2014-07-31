app.controller("ViewMapController", ['$scope', 'mapOptionsService', 'mapService', function($scope, mapOptionsService, mapService) {
    // Get map options object to create the map
    var optionsObject = {};
    _.forIn(mapOptionsService.getAllModified(), function(option) {
        optionsObject[option.name] = option.value;
    });
    mapService.initMap(optionsObject);

    // Options have been changed via the sidebar, update the map!
    $scope.$on('mapOptionChange', function() {
        var option = mapOptionsService.lastUpdatedOption();
        mapService.setMapOption(option);
    });

    // The map has changed, update the options via the mapOptionsService
    $scope.$on('moveend', function() {
        var options = mapOptionsService.getAllWithStateMethod();

        _.forIn(options, function(option) {
            // Run the options' state method to get the new value.
            var newValue = mapService.getMap()[option.stateMethod]();
            mapOptionsService.set(option.name, newValue);
        });
    });
}]);