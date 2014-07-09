var app = angular.module('app', ['ngRoute']);

app.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/map', {
                templateUrl: 'partials/map-view.html',
                controller: 'MapViewController'
            }).
            when('/code', {
                templateUrl: 'partials/code-view.html',
                controller: 'CodeViewController'
            }).
            otherwise({
                redirectTo: '/map'
            });
    }]);