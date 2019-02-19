
var app = angular.module("myApp", []);


app.controller("myCtrl", function($scope, $http) {
    console.log("Hello World from controller!");

    function refresh() {
        $http.get('/contactlist').then(function(response) {
            console.log("I got the data I requested");
            $scope.contactlist = response.data;
            console.log("refresh");
        });
    }

    refresh();

    $scope.addContact = function() {
        console.log($scope.person);
        $http.post('/addcontact', $scope.person).then(function(response) {
            console.log(response);
            refresh();
            $scope.person = "";
        });
    }

    $scope.remove = function(id) {
    	console.log(id);
    	$http.delete('/contactlist/' + id).then(function(response) {
    		console.log(response);
    		refresh();
    	});
    }

    $scope.edit = function(id) {
        // $scope.ShowHide = function(){
            $scope.IsVisible = $scope.IsVisible = false;
        // }
    	$http.get('/contactlist/' + id).then(function(response) {
    		$scope.person = response.data;
    		console.log(response);
    	});
    }

    $scope.update = function() {
    	console.log($scope.person);
    	$http.put('/contactlist', $scope.person).then(function(response) {
			console.log(response);
			refresh();
    	});
    }
    $scope.deselect = function() {
        $scope.person = "";
      }
    

});