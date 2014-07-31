// Responsible for outputting map HTML + Javascript
app.factory('mapCodeService', ['mapOptionsService', 'mapFeatureService', function(mapOptionsService, mapFeatureService) {
    var showCode = false;

    //region Static Code
    var staticBeginHtml = '' +
        '&lt;!DOCTYPE html&gt;\n' +
        '&lt;html&gt;\n' +
        '&lt;head&gt;\n' +
        '&lt;title&gt;Simple Map&lt;/title&gt;\n' +
        '&lt;meta name="viewport" content="initial-scale=1.0, user-scalable=no"&gt;\n' +
        '&lt;meta charset="utf-8"&gt;\n' +
        '&lt;link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet-0.7.3/leaflet.css" /&gt;\n' +
        '&lt;style&gt;html, body, #map { height: 100%; margin: 0; padding: 0 }&lt;/style&gt;\n' +
        '&lt;script src="http://cdn.leafletjs.com/leaflet-0.7.3/leaflet.js"&gt;&lt;/script&gt;\n' +
        '&lt;/head&gt;\n' +
        '&lt;body&gt;\n' +
        '&lt;div id="map"&gt;&lt;/div&gt;\n' +
        '&lt;script&gt;\n';

    var staticEndHtml = '' +
        '&lt;/script&gt;\n' +
        '&lt;/body&gt;\n' +
        '&lt;/html&gt;\n';

    var staticBeginJs = '(function() {\n' +
                        '    var map;\n' +
                        '    function initialize() {\n';

    var staticInitMapJs =     '        map = new L.Map("map", options);\n' +
                        '        var osm = new L.TileLayer(options.url, options);\n' +
                        '        map.addLayer(osm);\n';

    var staticEndJs =   '    }\n' +
                        '    initialize();\n' +
                        '}());\n';

    //endregion

    var getMapOptions = function() {
        var js = '        var options = {\n',
            options = mapOptionsService.getAllModified();

        _.forIn(options, function(option, key) {
            js += "            ";

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

            if (parseInt(key) < options.length - 1) {
                js += ",\n";
            } else {
                js += "\n";
            }
        });
        js += '        };\n';
        return js;
    };

    var getMapFeatures = function() {
        var js = "\n",
            features = mapFeatureService.getAllUsed();

        _.forIn(features, function(feature) {
            js += "        ";
            var options = feature.options();
            js += "L." + feature.name + "(";

            var index = 0;
            _.forIn(options, function(option, key) {
                js += JSON.stringify(option);
                index += 1;

                if (parseInt(key) < options.length - 1) {
                    js += ", ";
                }
            });
            js += ").addTo(map);\n";
        });
        return js;
    };

    var getCodeView = function() {
        var html = "";
        html += staticBeginHtml;
        html += staticBeginJs;
        html += getMapOptions();
        html += staticInitMapJs;
        html += getMapFeatures();
        html += staticEndJs;
        html += staticEndHtml;
        return html;
    };

    var toggleShowCode = function() {
        showCode = !showCode;
        return showCode;
    };

    return {
        getCodeView: getCodeView,
        showCode: function() { return showCode },
        toggleShowCode: toggleShowCode
    };
}]);