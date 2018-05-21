$(document).ready(function(){
  
  var latitude, longitude, weatherData, temp, location, id;
  
  function changeMeasurement(){
    if(temp.endsWith('C')){
      temp = parseInt(weatherData.main.temp) * 2 + 30 + String.fromCharCode(176) + "F";
      $('#temp').html("The temperature is: " + temp);
    } else if (temp.endsWith('F')){
      temp = parseInt(weatherData.main.temp) + String.fromCharCode(176) + "C"
      $('#temp').html("The temperature is: " + temp);
    }
  }

  $('#temp').on('click', changeMeasurement);

  function addIcon(){
    idMap = {
      '2': "11d.png'>",
      '3': "09d.png'>",
      '5': "10d.png'>",
      '6': "13d.png'>",
      '7': "50d.png'>",
      '8': "01d.png'>"
    };
    let html = "<img src='http://openweathermap.org/img/w/" + idMap[id.toString().charAt(0)];
    $("#icon").html(html);
  }
  
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function(position){
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
      var url = 'https://fcc-weather-api.glitch.me/api/current?lat='+latitude+'&lon='+longitude;
      $.getJSON(url, function(data){
        weatherData = data;
        temp = parseInt(weatherData.main.temp) + String.fromCharCode(176) + "C";
        $('#temp').html("The temperature is: " + temp);
        location = weatherData.name + ", " + weatherData.sys.country;
        $('#location').html("You are in " + location);
        id = weatherData.weather[0].id;
        addIcon();
      });
    });
  }
  
});
