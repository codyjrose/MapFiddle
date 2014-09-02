app.factory('mapService', ['$rootScope', '$location', 'mapTypeService', 'mapOptionsService', function ($rootScope, $location, mapTypeService, mapOptionsService) {
    "use strict";

    var activeMapType = mapTypeService.getActiveMapTypeName();

    $rootScope.$on('mapTypeChange', function(e, mapTypeName) {
        activeMapType = mapTypeName;
    });

    //region Map storage
    var map,
        maps = [
            {
                name: "OSM",
                mapObj: null
            },
            {
                name: "GM",
                mapObj: null
            }
        ];

    /**
     * Assigns mapService's map object by map type.
     * @param mapTypeName
     */
    var setMapType = function(mapTypeName) {
        map = _.find(maps, function(map) { return map.name === mapTypeName; });
    };

    /**
     * Saves the map object to the maps array so the map doesn't have to be recreated each time the map type is changed.
     */
    var storeMap = function() {
        _.find(maps, function(m) { return m.name === map.name; }).mapObj = map.mapObj;
    };
    //endregion

    /**
     * Add the Mapstrap logo to the map
     */
    var addLogo = function () {
        var logo = L.control({position: 'bottomleft'});

        logo.onAdd = function () {
            var branding = L.DomUtil.create('h3', 'brand legend');

            branding.innerHTML += "<span id='logo'><i class='fa fa-map-marker'></i> Mapstrap</span>";
            return branding;
        };

        logo.addTo(map.mapObj);
    };

    /**
     * Add moveend event to map.
     * Mostly done so codeService can update it's output HTML/JS and the code will update as the map is moved around.
     */
    var addMoveEndEvent = function () {
        map.mapObj.on('moveend', function () {
            $rootScope.$broadcast('mapMoveEnd');
        });
    };

    var initMap = function () {
        var options = {};
        _.forIn(mapOptionsService.getAllModified(), function (option) {
            options[option.name] = option.value;
        });
        var mapTypeName = activeMapType;

        setMapType(mapTypeName);

        // Short curcuit if map already exists;
        if(map.mapObj) {
            return;
        }

        if (mapTypeName === "OSM") {
            if ($location.absUrl().indexOf('/src') > 0) {
                // Hacky way to check if work in dev or prod env. When in prod, images are served up via cdn.
                L.Icon.Default.imagePath = 'assets/leaflet/';
            }

            map.mapObj = new L.Map('osmmap', options);
            storeMap(mapTypeName);

            // Create and add tile layer.
            var osm = new L.TileLayer(options.url, options);
            map.mapObj.addLayer(osm);

            addMoveEndEvent();
            addLogo();

        } else {
            options.center = getActiveMapTypeLatLngObj(options.center);
            options.mapTypeControlOptions = {
                style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
                position: google.maps.ControlPosition.TOP_LEFT
            };

            map.mapObj = new google.maps.Map(document.getElementById('gmap'), options);

            storeMap(mapTypeName);
        }
    };

    //region Map state functions
    var getMap = function () {
        return map.mapObj;
    };

    var getZoom = function () {
        return map.mapObj.getZoom();
    };

    var getMapCenter = function () {
        return map.mapObj.getCenter();
    };

    var getLatLngInCurrentBounds = function () {
        var ne = map.mapObj.getBounds().getNorthEast(),
            sw = map.mapObj.getBounds().getSouthWest(),
            lat, lng;

        if (typeof(ne.lat) === 'function') {
            lat = Math.random() * (ne.lat() - sw.lat()) + sw.lat();
            lng = Math.random() * (ne.lng() - sw.lng()) + sw.lng();
        } else {
            lat = Math.random() * (ne.lat - sw.lat) + sw.lat;
            lng = Math.random() * (ne.lng - sw.lng) + sw.lng;
        }

        return getActiveMapTypeLatLngObj([lat, lng]);
    };
    //endregion

    //region Utility functions
    /**
     * Convert Array containing latitude and longitude into a google maps LatLng object.
     * @param latLng
     * @returns {*}
     */
    var convertArrayToGoogleLatLng = function(latLng) {
        if (Array.isArray(latLng) || latLng instanceof L.latLng) {
            return new google.maps.LatLng(latLng[0], latLng[1]);
        }
        return latLng;
    };
    /**
     * Convert a google maps LatLng object to an array containing latitude and longitude.
     * @param latLngObj
     * @returns {*}
     */
    var convertGoogleToLeafletLatLng = function(latLngObj) {
        if (latLngObj instanceof google.maps.LatLng) {
            return new L.LatLng(latLngObj.lat(), latLngObj.lng());
        }
        return latLngObj;
    };

    var getActiveMapTypeLatLngObj = function (latLng) {
        switch (activeMapType) {
            case "OSM":
                if (latLng instanceof google.maps.LatLng) {
                    return new L.LatLng(latLng.lat(), latLng.lng());
                }
                break;
            case "GM":
                if (Array.isArray(latLng)) {
                    return new google.maps.LatLng(latLng[0], latLng[1]);
                } else if (latLng instanceof L.LatLng) {
                    return new google.maps.LatLng(latLng.lat, latLng.lng);
                }
                break;
            default:
                return latLng;
        }
        return latLng;
    };
    //endregion

    //region Options
    var toggleProperty = {
        OSM: function (option) {
            if (option.value) {
                map.mapObj[option.name].enable();
            } else {
                map.mapObj[option.name].disable();
            }
        }
    };

    var toggleControl = {
        OSM : function(option) {
            if (option.value) {
                map.mapObj[option.name].addTo(map.mapObj);
            } else {
                map.mapObj[option.name].removeFrom(map.mapObj);
            }
        }
    };

    var setOption = {
        OSM: function(option) {
            map.mapObj.options[option.name] = option.value;
        },
        GM: function(option) {
            var o = {};
            o[option.name] = option.value;

            map.mapObj.setOptions(o);
        }
    };

    var setMapOption = function (option) {
        switch (option.updateMethod) {
            case "mapProperty":
                toggleProperty[activeMapType](option);
                break;
            case "control":
                toggleControl[activeMapType](option);
                break;
            case "setOption":
                setOption[activeMapType](option);
                break;
            default:
                break;
        }
    };
    //endregion

    //region Features
    var addFeature = {
        OSM: function (feature) {
            feature.obj = L[feature.name].apply(null, feature.options())
                .addTo(map.mapObj);
        },
        GM: function (feature) {
            feature.obj = new google.maps[feature.name](feature.options());

        }
    };

    var removeFeature = {
        OSM: function (feature) {
            map.mapObj.removeLayer(feature.obj);
            feature.obj = null;
        },
        GM: function (feature) {
            feature.obj.setMap(null);
            feature.obj = null;
        }
    };

    var bindPopupToFeature = {
        OSM: function (feature) {
            feature.obj.bindPopup(feature.popupContent);
            feature.popupEnabled = true;
        },
        GM: function (feature) {
            feature.infoWindow = new google.maps.InfoWindow();

            google.maps.event.addListener(feature.obj, 'click', function(e) {
                feature.infoWindow.setContent(feature.popupContent);
                feature.infoWindow.setPosition(e.latLng);

                feature.infoWindow.open(map.mapObj);
            });
        }
    };

    var unbindPopupToFeature = {
        OSM: function (feature) {
            feature.obj.unbindPopup();
            feature.popupEnabled = false;
        },
        GM: function (feature) {
            google.maps.event.clearInstanceListeners(feature.obj);
            feature.infoWindow = null;
            feature.popupEnabled = false;
        }
    };

    var toggleMapFeature = function (feature) {
        if (feature.obj) {
            unbindPopupToFeature[activeMapType](feature);
            removeFeature[activeMapType](feature);
        } else {
            addFeature[activeMapType](feature);
        }
        return feature;
    };

    var toggleBindPopupToFeature = function (feature) {
        if (feature.popupEnabled) {
            bindPopupToFeature[activeMapType](feature);

        } else {
            unbindPopupToFeature[activeMapType](feature);
        }
    };
    //endregion

    //region Events
    var enableEvent = {
        OSM: function (event) {
            map.mapObj.on(event.name, function (e) {
                var popupLatLng = event.eventLatLng(e);
                var popupContent = event.eventContent(e);

                L[event.method]()
                    .setLatLng(popupLatLng)
                    .setContent(popupContent)
                    .openOn(map.mapObj);
            });
        },
        GM: function (event) {
            event.infoWindow = new google.maps.InfoWindow();

            google.maps.event.addListener(map.mapObj, event.name, function(e) {
                var popupLatLng = event.eventLatLng(e);
                var popupContent = event.eventContent(e);

                event.infoWindow.setContent(popupContent);
                event.infoWindow.setPosition(popupLatLng);

                event.infoWindow.open(map.mapObj);
            });
        }
    };

    var disableEvent = {
        OSM: function (event) {
            map.mapObj.off(event.name);
        },
        GM: function (event) {
            google.maps.event.clearInstanceListeners(event.obj);
        }
    };

    var toggleMapEvent = function (event) {
        if (!event.enabled) {
            enableEvent[activeMapType](event);
            event.enabled = true;

        } else {
            disableEvent[activeMapType](event);
            event.enabled = false;
        }
    };
    //endregion

    return {
        initMap: initMap,
        getMap: getMap,
        getZoom: getZoom,
        getMapCenter: getMapCenter,
        getLatLngInCurrentBounds: getLatLngInCurrentBounds,
        setMapOption: setMapOption,
        toggleMapFeature: toggleMapFeature,
        toggleBindPopupToFeature: toggleBindPopupToFeature,
        toggleMapEvent: toggleMapEvent
    };
}]);
