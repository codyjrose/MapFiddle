// Responsible for the map code inside the HTML + Javascript modal.
app.factory('mapCodeService', ['$rootScope', 'mapOptionsService', 'mapFeatureService', 'mapEventsService', 'mapTypeService', function ($rootScope, mapOptionsService, mapFeatureService, mapEventsService, mapTypeService) {
    "use strict";

    var activeMapType = mapTypeService.getActiveMapTypeName();

    $rootScope.$on('mapTypeChange', function(e, mapTypeName) {
        activeMapType = mapTypeName;
    });
    var showCode = false,

    // Static Code
    html1 = '&lt;!DOCTYPE html&gt;\n' +
        '&lt;html&gt;\n' +
        '&lt;head&gt;\n' +
        '&lt;title&gt;My Map&lt;/title&gt;\n' +
        '&lt;meta name="viewport" content="initial-scale=1.0, user-scalable=no"&gt;\n' +
        '&lt;meta charset="utf-8"&gt;\n',

    linkStyleScript = {
        OSM: '&lt;link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet-0.7.3/leaflet.css" /&gt;\n' +
             '&lt;style&gt;html, body, #map { height: 100%; margin: 0; padding: 0 }&lt;/style&gt;\n' +
             '&lt;script src="http://cdn.leafletjs.com/leaflet-0.7.3/leaflet.js"&gt;&lt;/script&gt;\n',

        GM:  '&lt;style&gt;html, body, #map { height: 100%; margin: 0; padding: 0 }&lt;/style&gt;\n' +
             '&lt;script src="//maps.googleapis.com/maps/api/js?v=3.exp"&gt;&lt;/script&gt;\n'

    },

    html2 = '&lt;/head&gt;\n' +
            '&lt;body&gt;\n' +
            '&lt;div id="map"&gt;&lt;/div&gt;\n' +
            '&lt;script&gt;\n',

    html3 = '&lt;/script&gt;\n' +
            '&lt;/body&gt;\n' +
            '&lt;/html&gt;\n',

    js1 = '(function() {\n' +
          '  "use strict";\n\n',

    createMap = {
        OSM: '  // Create map.\n' +
             '  // First param is id of div that will contain the map. Second param is the map options object \n' +
             '  var map = new L.Map("map", options);\n' +
             '  var osm = new L.TileLayer(options.url, options);\n' +
             '  map.addLayer(osm);\n',
        GM:  '  // Create map.\n' +
             '  // First param is id of div that will contain the map. Second param is the map options object \n' +
             '  var map = new google.maps.Map(document.getElementById("map"), options);\n'
    },

    js3 = '}());\n';

    var getMapOptions = {
        OSM: function () {
            var js = '  // Create map options object\n' +
                    '  var options = {\n',
                options = mapOptionsService.getAllModified();

            _.forIn(options, function (option, key) {
                js += "    ";

                switch (option.type) {
                    case "object":
                        js += option.name + ": " + option.value.toString();
                        break;
                    case "array":
                        js += option.name + ": [" + option.value + "]";
                        break;
                    case "number":
                        js += option.name + ": " + option.value;
                        break;
                    case "boolean":
                        js += option.name + ": " + option.value;
                        break;
                    default:
                        js += option.name + ": '" + option.value + "'";
                        break;
                }

                if (parseInt(key, 10) < options.length - 1) {
                    js += ",\n";
                } else {
                    js += "\n";
                }
            });
            js += "  };\n";
            return js;
        },
        GM: function () {
            var js = '  // Create map options object\n' +
                      '  var options = {\n',
                options = mapOptionsService.getAllModified();

            _.forIn(options, function (option, key) {
                js += "    ";

                switch (option.type) {
                    case "google.maps.LatLng":
                        if (Array.isArray(option.value)) {
                            js += option.name + ": new google.maps.LatLng" + new google.maps.LatLng(option.value[0], option.value[1]);
                        } else {
                            js += option.name + ": new google.maps.LatLng" + option.value.toString();
                        }

                        break;
                    case "object":
                        js += option.name + ": " + option.value.toString();
                        break;
                    case "array":
                        js += option.name + ": [" + option.value + "]";
                        break;
                    case "number":
                        js += option.name + ": " + option.value;
                        break;
                    case "boolean":
                        js += option.name + ": " + option.value;
                        break;
                    default:
                        js += option.name + ": '" + option.value + "'";
                        break;
                }

                if (parseInt(key, 10) < options.length - 1) {
                    js += ",\n";
                } else {
                    js += "\n";
                }
            });
            js += "  };\n";
            return js;
        }
    };

    var getMapFeatures = {
        OSM: function () {
            var js = "",
                features = mapFeatureService.getAllUsed();

            if (features.length) {
                js += "\n   // Add features\n";
            } else {
                return "";
            }

            _.forIn(features, function (feature) {
                js += "  ";
                var options = feature.options();
                js += "var " + feature.name + " = L." + feature.name + "(";

                _.forIn(options, function (option, key) {
                    js += JSON.stringify(option);

                    if (parseInt(key, 10) < options.length - 1) {
                        js += ", ";
                    }
                });
                js += ").addTo(map);\n";
            });

            return js;
        },
        GM: function () {
            var js = "",
                features = mapFeatureService.getAllUsed();

            if (features.length) {
                js += "\n   // Add features\n";
            } else {
                return "";
            }

            _.forIn(features, function (feature) {
                js += "  ";
                js += "var " + feature.name + " = new google.maps." + feature.name + "(";
                js += feature.outputObject();
                js += ");\n";
            });

            return js;
        }
    };

    var getMapFeaturePopups = {
        OSM: function () {
            var js = "",
                popups = mapFeatureService.getAllUsedPopups();

            if (popups.length) {
                js += "\n  // Add feature popups\n";
            } else {
                return "";
            }

            _.forIn(popups, function (popup) {
                js += "  ";
                js += popup.name + ".bindPopup(&quot;&lt;b&gt;Hello world&lt;/b&gt;&lt;br&gt;I&#39;m a popup attached to " + popup.name + "&quot;);\n";
            });
            return js;
        },
        GM: function () {
            var js = "",
                features = mapFeatureService.getAllUsedPopups();

            if (features.length) {
                js += "\n  // Add feature popups\n";
            } else {
                return "";
            }

            _.forIn(features, function (feature) {
                js += "  ";

                js += "var infoWindow" + feature.name + " = new google.maps.InfoWindow();\n";

                js += "  google.maps.event.addListener(" + feature.name +",'click', function(e) {\n";
                js += "    infoWindow" + feature.name + ".setContent(&quot;&lt;b&gt;Hello world&lt;/b&gt;&lt;br&gt;I&#39;m a popup attached to " + feature.name + "&quot;);\n";
                js += "    infoWindow" + feature.name + ".setPosition(e.latLng );\n";
                js += "    infoWindow" + feature.name + ".open(map);\n";
                js += "  });\n";
            });
            return js;
        }
    };

    var getMapEvents = {
        OSM: function () {
            var js = "",
                events = mapEventsService.getAllEnabled();

            if (events.length) {
                js += "\n  // Add map events\n";
            } else {
                return "";
            }

            _.forIn(events, function (event, key) {
                var popupName = event.name + "Popup";
                var eventFunctionName = event.name + "Event";

                js += "  var " + popupName + " = L.popup();\n";
                js += "  function " + eventFunctionName + "(e) {\n";
                js += "    " +  popupName + "\n";
                js += "      .setLatLng(" + event.popupOptions.latLng + ")\n";
                js += "      .setContent('" + event.popupOptions.content + "' + " + event.popupOptions.eventResultContent + ")\n";
                js += "      .openOn(map);\n";
                js += "  }\n";
                js += "  map.on('" + event.name + "', " + eventFunctionName + ");\n";

                if (parseInt(key, 10) < events.length - 1) {
                    js += "\n";
                }
            });

            return js;
        },
        GM: function () {
            var js = "",
                events = mapEventsService.getAllEnabled();

            if (events.length) {
                js += "\n  // Add map events\n";
            } else {
                return "";
            }

            _.forIn(events, function (event, key) {
                js += "  var infoWindow = new google.maps.InfoWindow();\n";

                js += "  google.maps.event.addListener(map, '" + event.name + "', function(e) {\n";
                js += "    infoWindow.setContent('" + event.popupOptions.content + "' + " + event.popupOptions.eventResultContent + ");\n";
                js += "    infoWindow.setPosition(e.latLng );\n";
                js += "    infoWindow.open(map);\n";
                js += "  });\n";

                if (parseInt(key, 10) < events.length - 1) {
                    js += "\n";
                }
            });

            return js;
        }

    }

    var getCodeView = function () {
        var code = [];
        code.push(html1);
        code.push(linkStyleScript[activeMapType]);
        code.push(html2);
        code.push(js1);
        code.push(getMapOptions[activeMapType]());
        code.push(createMap[activeMapType]);
        code.push(getMapFeatures[activeMapType]());
        code.push(getMapFeaturePopups[activeMapType]());
        code.push(getMapEvents[activeMapType]());
        code.push(js3);
        code.push(html3);

        return code.join("");
    };

    var toggleShowCode = function () {
        showCode = !showCode;
        return showCode;
    };

    return {
        getCodeView: getCodeView,
        showCode: function () { return showCode; },
        toggleShowCode: toggleShowCode
    };
}]);
