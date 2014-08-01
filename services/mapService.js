app.factory('mapService', ['$rootScope', function($rootScope) {

    var map, legend;

    var getMap = function() {
        return map
    };

    var getMapCenter = function() {
        var center = map.getCenter();
        return [ center.lat, center.lng ];
    };

    var initMap = function (options) {
        map = new L.Map('map', options);

        // create the tile layer with correct attribution
        var osm = new L.TileLayer(options.url, options);

        map.addLayer(osm);

        map.on('moveend', function() {
            $rootScope.$broadcast('mapMoveEnd');
        });

        var legend = L.control({position: 'topright'});

        legend.onAdd = function (map) {
            var branding = L.DomUtil.create('h3', 'brand legend')

            branding.innerHTML = "MapFiddle";
            return branding;
        };

        legend.addTo(map);
    };

    // For options that are properties of the map. Ref: http://leafletjs.com/reference.html#map-properties
    var toggleProperty = function(option) {
        if (option.value) {
            map[option.name].enable();
        } else {
            map[option.name].disable();
        }
    };

    // For options that are map controls. Ref: http://leafletjs.com/reference.html#map-addcontrol
    var toggleControl = function(option) {
        if (option.value) {
            map[option.name].addTo(map)
        } else {
            map[option.name].removeFrom(map);
        }
    };

    var updatePropertyOfOptions = function(option) {
        map.options[option.name] = option.value;
    };

    var setOption = function(option) {
        switch (option.updateMethod) {
            case "mapProperty":
                toggleProperty(option);
                break;
            case "control":
                toggleControl(option);
                break;
            case "propertyOfMapDotOptions":
                updatePropertyOfOptions(option);
                break;
            default:
                console.log('could not update: ' + option.name);
                break;
        }
    };

    var addFeature = function(feature) {
        feature.obj = L[feature.name]
            .apply(null, feature.options())
            .addTo(map);
    };

    var removeFeature = function(feature) {
        map.removeLayer(feature.obj);
        feature.obj = null;
    };

    var toggleMapFeature = function(feature) {
        if (feature.obj) {
            removeFeature(feature);
        }  else {
            addFeature(feature);
        }
        return feature;
    };


    return {
        getMap: getMap,
        getMapCenter: getMapCenter,
        initMap: initMap,
        setMapOption: setOption,
        toggleMapFeature: toggleMapFeature
    }
}]);
