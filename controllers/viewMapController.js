app.controller("ViewMapController", ['$scope', 'mapOptionsService', 'mapFeatureService','mapEventsService', 'mapService', function($scope, mapOptionsService, mapFeatureService, mapEventsService, mapService) {
    // Get map options object to create the map
    var optionsObject = {};
    _.forIn(mapOptionsService.getAllModified(), function(option) {
        optionsObject[option.name] = option.value;
    });
    mapService.initMap(optionsObject);

    // Options have been changed via the sidebar, update the map.
    $scope.$on('mapOptionChange', function() {
        var option = mapOptionsService.lastUpdatedOption();
        mapService.setMapOption(option);
    });

    // Marker, circle, polygon has been added or removed, let everyone know.
    $scope.$on('mapFeatureChange', function() {
        var feature = mapFeatureService.lastUpdatedFeature();
        mapService.toggleMapFeature(feature);
    });

    // Marker, circle, polygon has been added or removed, let everyone know.
    $scope.$on('mapFeaturePopupChange', function() {
        var feature = mapFeatureService.lastUpdatedFeature();
        mapService.toggleBindPopupToFeature(feature);
    });

    // Marker, circle, polygon has been added or removed, let everyone know.
    $scope.$on('mapEventChange', function() {
        var event = mapEventsService.lastUpdatedEvent();
        mapService.toggleMapEvent(event);
    });

    // The map has changed, update the options values (such as center and zoom level).
    $scope.$on('mapMoveEnd', function() {
        var options = mapOptionsService.getAllWithStateMethod();

        _.forIn(options, function(option) {
            // Run the options' state method to get the new value.
            var newValue = mapService.getMap()[option.stateMethod]();
            mapOptionsService.set(option.name, newValue);
        });
    });
}]);