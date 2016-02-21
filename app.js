
/*
 Declaring angular module to create and render components i.e. add movies to the page
 */

angular.module('movieRepository',[]);

var app = angular.module('movieRepository');

app.controller('mainCtrl',['$scope','$rootScope', 'movieSv', function($scope, $rootScope, movieSv){

    $rootScope.movies = [];
    $scope.movie = {
        title : '',
        director:'',
        publisher:''
    };

    $scope.isDuplicate = false;

    /*
     to add new movie to movies array
     */
    $scope.add = function(){
        $scope.isDuplicate = false;
        $scope.validate();
        if(!$scope.isDuplicate){
            //$scope.movies.push($scope.movie);
            movieSv.addmovie($scope.movie);
            $scope.getmovies();
            $scope.clearInputFields();
        }
    };

    $scope.getmovies = function () {
        $scope.movies = movieSv.getmovies();
    };

    $scope.isActive = false;

    /*
     to change icon on click of menu tab used ng-icon instead of jquery as suggested
     */
    $scope.changeIcon = function(){
        $scope.isActive = !$scope.isActive;
    };

    /*
     to close the component when "NO" button selected
     */
    $scope.mainComponent= true;
    $scope.clearComponent = function() {
        $scope.mainComponent = !$scope.mainComponent;
    };

    /*
     to check duplicate entries based on title and director as suggested
     */
    $scope.validate = function(){
        angular.forEach($scope.movies,function(item){
            if(item.title === $scope.movie.title && item.director === $scope.movie.director){
                $scope.isDuplicate = true;
                alert("Duplicate Entry - Title with same director already exists");
                return
            }
        });
    };

    /*
     to clear input fields after adding new movie
     */
    $scope.clearInputFields = function(){
        $scope.movie = {
            title : '',
            director:'',
            publisher:''
        }
    }
}]);

/*
 Created a service to handle movie functionality.
 As there is no database, used $rootScope based on some research and understanding
 */
app.factory("movieSv",['$rootScope',function($rootScope){

    return{
        addmovie: addmovie,
        getmovies: getmovies
    };

    function addmovie(movie){
        $rootScope.movies.push(movie);
    }
    function getmovies(){
        return $rootScope.movies;
    }

}]);

/*
 Created a directive for the movie card
 */

app.directive('movieCard',function(){
    return{
        scope:{
            movies :'='
        },
        restrict:'E',
        template:"<div class='col-md-12 displayComponent' ng-repeat='movie in movies | orderBy: \"title\"'>" +
        "<div class='col-md-4 bookImage'></div> " +
        "<div class='col-md-8  marginBottom'>" +
        "<h2>{{movie.title}}</h2> " +
        "<h4 style='color: gray; opacity: 0.8'>{{movie.director}}</h4> " +
        "<h5>{{movie.publisher}}</h5> <hr> <div class='marginBottom'>" +
        "<div class='col-xs-6'> <button class='sample'>FREE SAMPLE </button> </div> " +
        "<div class='col-xs-6'> <button class='review'>REVIEW </button> " +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>",
        link: function(scope,element,attrs){}
    }
});



