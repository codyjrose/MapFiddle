app.factory('geoLocationService', ['$http', function ($http) {
   "use strict";

    var getLatLng = function () {
        $http({method: 'GET', url: 'http://freegeoip.net/json/8.8.8.8'}).
            success(function(data, status, headers, config) {
                return [data.latitude, data.longitude];
            }).
            error(function(data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });
    };

    return {
        getLatLng: getLatLng
    };
}]);