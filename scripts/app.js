angular.module('weatherApiApp', [])

.service('weatherService', function($http){
  
  this.getWeather = function(lat, lon, callback){
    var url = 'https://fcc-weather-api.glitch.me/api/current?lat='+lat+'&lon='+lon;
    console.log(url);
    $http.get(url)
    .then(callback);
  };
})

.controller('mainCtrl', function($scope, weatherService){
  
  
  $scope.changeMeasurement = function(){
    if($scope.temp.endsWith('C')){
      $scope.temp = $scope.weatherData.main.temp * 2 + 30 + " F";
    } else if ($scope.temp.endsWith('F')){
      $scope.temp = $scope.weatherData.main.temp + " C"
    }
  }
  
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function(position){
      $scope.latitude = position.coords.latitude;
      $scope.longitude = position.coords.longitude;
      weatherService.getWeather($scope.latitude, $scope.longitude, function(response){
        $scope.weatherData = response.data;
        console.log($scope.weatherData);
        $scope.temp = $scope.weatherData.main.temp + " C";
        $scope.location = $scope.weatherData.name + ", " + $scope.weatherData.sys.country;
      });
    });
  }
  
})
