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
        '    <style>html, body, #map-canvas { height: 100%; margin: 0px; padding: 0px }</style>\n' +
        '    <script src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false"></script>\n' +
        '    <script>\n';

    var staticEndHtml = '' +
        '    </script>\n' +
        '  </head>\n' +
        '  <body>\n' +
        '    <div id="map-canvas"></div>\n' +
        '  </body>\n' +
        '</html>\n';
    //endregion

    var getMapJS = function() {

        var js = '\n' +
            '      var map;\n' +
            '      function initialize() {\n' +
            '      var mapOptions = {\n';

        angular.forEach(mapOptionsService.getAll(), function(option, index) {

            if (option.type == "object")
            {
                js += "        " + index + ": " + option.value.toString();
            } else {
                js += "        " + index + ": " + option.value;
            }

            js += ",\n";
//            if (index !== usedOptions.length - 1) {
//                js += ",";
//            }

            });



        js +=
            '      };\n' +
            '      map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);\n' +
            '      }\n' +
            '      google.maps.event.addDomListener(window, "load", initialize);\n' +
            '\n';

        return js;
    };

    var getMapMarkup = function() {
        // TODO Need to do some beautifying here at some point: https://github.com/einars/js-beautify
        return staticBeginHtml + getMapJS() + staticEndHtml;
    };

    return {
        generateHtml: getMapMarkup
    };
}]);