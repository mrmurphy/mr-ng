(function() {
    var template = "<div ng-if='on === state'><ng-transclude>" +
    "</ng-transclude></div>"

    angular.module('mr.ng')
    .directive('mrWait', function() {
        return {
            restrict: 'E',
            transclude: true,
            template: template,
            scope: {
                // `on` can be one of three strings:
                // 'resolved'
                // 'rejected'
                // 'pending'
                on: '@',

                // `exp` is an expression returning a
                // promise
                exp: '&'
            },
            controller: function($scope) {
                $scope.state = 'pending'
                $scope.exp()
                .then(function() {
                    $scope.state = 'resolved'
                }, function() {
                    $scope.state = 'rejected'
                })
            }
        }
    })
})()