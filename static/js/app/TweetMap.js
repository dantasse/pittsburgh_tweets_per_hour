// Here's where we're calling the google maps API. No API key needed yet, b/c
// we're not using it very much. If we started using it enough that we wanted
// to track our usage, we should get an API key. More info:
// https://developers.google.com/maps/documentation/javascript/tutorial#api_key
//
// And that "async!" is from the async plugin.
// https://github.com/millermedeiros/requirejs-plugins
define(['async!//maps.googleapis.com/maps/api/js?language=en&libraries=geometry,drawing,places,visualization'], function () {
    return function (canvas, dataPanel) {

        var mapOptions = {
          center: {lat: 40.4417, lng: -80.0000}, // pittsburgh center
          zoom: 12,
          styles: 
          [
            {
              "elementType": "labels",
              "stylers": [
                { "visibility": "off" }
              ]
            },{
              "elementType": "geometry",
              "stylers": [
                { "visibility": "simplified" }
              ]
            },{
              "stylers": [
                { "saturation": -49 },
                { "gamma": 0.75 }
              ]
            },{
              "featureType": "poi",
              "stylers": [
                { "visibility": "off" }
              ]
            },{
              "featureType": "landscape",
              "stylers": [
                { "visibility": "off" }
              ]
            }
          ]
        };
        var map = new google.maps.Map(canvas, mapOptions);

        var radiusBox = document.createElement('input');
        radiusBox.setAttribute("id", "radius");
        radiusBox.setAttribute("placeholder", "radius");
        var hourBox= document.createElement('input');
        hourBox.setAttribute("id", "hour");
        hourBox.setAttribute("placeholder", "hour");
        var maximumBox = document.createElement('input');
        maximumBox.setAttribute("id", "maximum");
        maximumBox.setAttribute("placeholder", "maximum");
        var goButton = document.createElement('button');
        goButton.setAttribute("id", "go");
        goButton.setAttribute("z-index", "100");
        goButton.innerHTML = "Go";
        var timeLabel = document.createElement('div');
        timeLabel.setAttribute("id", "timeLabel");
        timeLabel.innerHTML = " 2:00 PM";
        map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(timeLabel);

        var heatmapLayer = new google.maps.visualization.HeatmapLayer();
        heatmapLayer.setMap(map); 

        google.maps.event.addDomListener(goButton, 'click', function() {
          $.get('/hour/' + hourBox.value, '', function(data) {
            console.log("got response");
            var heatMapData = [];
            for(var key in data) {
              if (data.hasOwnProperty(key)) {
                var arr = JSON.parse(key);
                var lat = arr[0];
                var lon = arr[1];
                var count = data[key];
                heatMapData.push({location: new google.maps.LatLng(lat, lon), weight: count});
              }
            }
            heatmapLayer.set('data', heatMapData);
            heatmapLayer.set('radius', parseInt($("#radius").val()));
            heatmapLayer.set('maxIntensity', parseInt($("#maximum").val()));
            var hour = parseInt(hourBox.value);
            var hourText = ":00";
            if (hour < 12) {
              hourText += " AM";
            } else {
              hour -= 12;
              hourText += " PM";
            }
            if (hour == 0) {
              hour = 12;
            }
            hourText = hour + hourText;
            if (hour < 10) {
              hourText = " " + hourText;
            }
            $("#timeLabel").text(hourText);
          });
        });
 
        var userSearchDiv = document.createElement('div');
        userSearchDiv.setAttribute("id", "userSearchDiv");
        userSearchDiv.appendChild(radiusBox);
        userSearchDiv.appendChild(document.createElement('br'));
        userSearchDiv.appendChild(hourBox);
        userSearchDiv.appendChild(document.createElement('br'));
        userSearchDiv.appendChild(maximumBox);
        userSearchDiv.appendChild(document.createElement('br'));
        userSearchDiv.appendChild(goButton);
        userSearchDiv.index = 1;
 
        map.controls[google.maps.ControlPosition.LEFT_TOP].push(userSearchDiv);
    };
});
