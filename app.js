// module
var civicApp = angular.module('civicApp', ['ngRoute', 'ngResource', 'ngCookies']);

civicApp.config(function($routeProvider){
    
    $routeProvider

    .when('/', {
        templateUrl: 'pages/home.html',
        controller: 'homeController'
    })

    .when('/reps', {
        templateUrl: 'pages/reps.html',
        controller: 'repController'
    })

});

civicApp.service('addressService', ['$cookies', function($cookies){
    
    this.address = '111 Main St., New York, NY'

    if ($cookies.address != null){
        this.address = $cookies.address
    }

    this.filter = 'All'

}]);



civicApp.controller('homeController', ['$scope', '$cookies', 'addressService', function($scope, $cookies, addressService) {

    $scope.address = addressService.address;

    $scope.$watch('address', function(){
        addressService.address = $scope.address;
    })

}]);

civicApp.controller('repController', ['$scope', '$resource', '$cookies', 'addressService', function($scope, $resource, $cookies, addressService) {

    $scope.address = addressService.address;

    $scope.$watch('address', function(){
        addressService.address = $scope.address;
    })

    $scope.filter = addressService.filter;

    $scope.$watch('filter', function(){
        addressService.filter = $scope.filter;
    })

    $cookies.address = $scope.address;

    $scope.repAPI = $resource("https://www.googleapis.com/civicinfo/v2/representatives",
        {callback: "JSON_CALLBACK"}, {get: {method: "JSONP"}}
    );

    $scope.repsResult = $scope.repAPI.get({
        key: 'AIzaSyCpkCKBwYoCvi5mbahHSmRs7y5PEyrEJuc',
        address: $scope.address
    })

}]);