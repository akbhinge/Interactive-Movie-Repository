
    /*
        Declaring angular module to create and render components i.e. add books to the page
     */

angular.module('bigCommerceTest',[]);

var app = angular.module('bigCommerceTest');

    app.controller('mainCtrl',['$scope','$rootScope', 'bookSv', function($scope, $rootScope, bookSv){

        $rootScope.books = [];
        $scope.book = {
            title : '',
            author:'',
            publisher:''
        };

        $scope.isDuplicate = false;

        /*
            to add new book to books array
         */
        $scope.add = function(){
            $scope.isDuplicate = false;
            $scope.validate();
            if(!$scope.isDuplicate){
                //$scope.books.push($scope.book);
                bookSv.addBook($scope.book);
                $scope.getBooks();
                $scope.clearInputFields();
            }
        };

        $scope.getBooks = function () {
            $scope.books = bookSv.getBooks();
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
            to check duplicate entries based on title and author as suggested
         */
        $scope.validate = function(){
            angular.forEach($scope.books,function(item){
                if(item.title === $scope.book.title && item.author === $scope.book.author){
                    $scope.isDuplicate = true;
                    alert("Duplicate Entry - Title with same author already exists");
                    return
                }
            });
        };

        /*
            to clear input fields after adding new book
         */
        $scope.clearInputFields = function(){
            $scope.book = {
                title : '',
                author:'',
                publisher:''
            }
        }
    }]);

    /*
        Created a service to handle book functionality.
        As there is no database, used $rootScope based on some research and understanding
     */
    app.factory("bookSv",['$rootScope',function($rootScope){

        return{
            addBook: addBook,
            getBooks: getBooks
        };

        function addBook(book){
            $rootScope.books.push(book);
        }
        function getBooks(){
            return $rootScope.books;
        }

    }]);

    /*
        Created a directive for the book card
     */

    app.directive('bookCard',function(){
        return{
            scope:{
                books :'='
            },
            restrict:'E',
            template:"<div class='col-md-12 displayComponent' ng-repeat='book in books | orderBy:title'>" +
            "<div class='col-md-4 bookImage'></div> " +
            "<div class='col-md-8  marginBottom'>" +
            "<h2>{{book.title}}</h2> " +
            "<h4 style='color: gray; opacity: 0.8'>{{book.author}}</h4> " +
            "<h5>{{book.publisher}}</h5> <hr> <div class='marginBottom'>" +
            "<div class='col-xs-6'> <button class='sample'>FREE SAMPLE </button> </div> " +
            "<div class='col-xs-6'> <button class='review'>REVIEW </button> " +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>",
            link: function(scope,element,attrs){}
        }
    });