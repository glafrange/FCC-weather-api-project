angular.module('weatherApiApp', [])

.service('weatherService', function($http){
  this.getWeather = function(callback){
    $http.get('https://fcc-weather-api.glitch.me/api/current?lat=35&lon=139')
    .then(callback);
  };
})

.controller('mainCtrl', function($scope, weatherService){
  $scope.helloWorld = function(){
    console.log($scope.coords);
  };
  weatherService.getWeather(function(response){
    console.log(response.data);
  });
  
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function(position){
      $scope.latitude = position.coords.latitude;
      $scope.longitude = position.coords.longitude;
    });
  }
})

