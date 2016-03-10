
var app = angular.module("movieRepository");

app.controller('welcomeController',['$scope', '$location', function($scope, $location){

     $scope.openPage = function(){
            $location.path('/addReview');
        };

     $scope.getPage = function(){
            $location.path('/getReview');
        };

}]);