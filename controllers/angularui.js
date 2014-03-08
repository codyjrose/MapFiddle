mfApp.controller('DropdownCtrl', function($scope) {
    $scope.items = [
        "Leaflet w/ OSM",
        "Google Maps"
    ];
});

// Angular UI modal stuff
mfApp.controller('HtmlOutputController', function($scope, $modal, mapOutputService) {
    $scope.header = "Copy/Pasta this into an HTML file.";

    $scope.open = function () {
        $scope.body = mapOutputService.generateHtml();

        var modalInstance = $modal.open({
            templateUrl: 'myModalContent.html',
            controller: ModalInstanceCtrl,
            resolve: {
                innerScope: function () {
                    return $scope;
                }
            }
        });

//        modalInstance.result.then(
//            function () {
//                $log.info("Modal OK'd at: " + new Date());
//            },
//            function () {
//                $log.info('Modal dismissed at: ' + new Date());
//            }
//        );
    };
});

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.
var ModalInstanceCtrl = function ($scope, $modalInstance, innerScope) {
    $scope.header = innerScope.header;
    $scope.body = innerScope.body;

    $scope.ok = function () {
        $modalInstance.close();
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
};