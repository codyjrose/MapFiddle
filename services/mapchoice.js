/**
 * Created by Cody on 3/9/14.
 * Responsible the map type (Google or Leaflet/OSM).
 */
mfApp.factory('mapChoiceService', function() {
    var mapType = {
        Leaflet: { codename: "leaflet", label: "Leaflet w/ OSM" },
        Google: { codename: "google", label: "Google Maps" }
    };

    var currentMapType = mapType.Leaflet;

    var toggleCurrentMapType = function() {
        currentMapType = currentMapType == mapType.Leaflet ? mapType.Google : mapType.Leaflet;

        return currentMapType;
    };

    return {
        getMapTypes: function() {
            return mapType;
        },
        getDefaultMapType: function() {
            return mapType.Google;
        },
        getCurrentMapType: function() {
            return currentMapType;
        },
        setCurrentMapType: function(newMapType) {
          currentMapType = newMapType;
        },
        toggleCurrentMapType: function() {
            return toggleCurrentMapType();
        }
    };
});