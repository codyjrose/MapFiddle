// Responsible for outputting map HTML + Javascript
app.factory('mapCodeService', ['mapOptionsService', function(mapOptionsService) {
    //region Static HTML
    var staticBeginHtml = '' +
        '<!DOCTYPE html>\n' +
        '<html>\n' +
        '  <head>\n' +
        '    <title>Simple Map</title>\n' +
        '    <meta name="viewport" content="initial-scale=1.0, user-scalable=no">\n' +
        '    <meta charset="utf-8">\n' +
        '    <link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet-0.7.3/leaflet.css" />\n' +
        '    <style>html, body, #map { height: 100%; margin: 0; padding: 0 }</style>\n' +
        '    <script src="http://cdn.leafletjs.com/leaflet-0.7.3/leaflet.js"></script>\n' +
        '  </head>\n' +
        '  <body>\n' +
        '    <div id="map"></div>\n' +
        '    <script>\n';

    var staticEndHtml = '' +
        '    </script>\n' +
        '  </body>\n' +
        '</html>\n';
    //endregion

    var getMapJS = function() {
        var options = mapOptionsService.getAllModified(),
            js = '      var map;\n' +
                 '      function initialize() {\n' +
                 '          var options = {\n';

        _.forIn(options, function(option, key) {
            js += "              ";

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

        js += '          };\n' +
              '          map = new L.Map("map", options);\n' +
              '          var osm = new L.TileLayer(options.url, options);\n' +
              '          map.addLayer(osm);\n' +
              '      }\n' +
              '      initialize();\n';

        return js;
    };

    var getCodeView = function() {
        var sections = [];
        sections.push(staticBeginHtml);
        sections.push(getMapJS());
        sections.push(staticEndHtml);
        return sections;
    };

    return {
        getCodeView: getCodeView
    };
}]);