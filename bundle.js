//    var gmapsKey = "AIzaSyAGWJpRtMXaQH80CENMwEKb7V_By5ZsaJ4";
//    var owKey = "5264779432aa5523b400895723caa06e";

(function makeAPICalls() {
    // get time
    var date = new Date();
    var hour = date.getHours();
    var body = document.body;
    // set class for day or night
    if (hour >= 18) {
        body.classList.remove('day');
        body.classList.add('night');
    } else {
        body.classList.remove('night');
        body.classList.add('day');
    }

    // element variables
    var theLoc = document.getElementById('location');
    var theData = document.getElementById('weather-data');
    var theDeg = document.getElementById('degrees');
    
    function loadLocationData() {
        var locUrl = 'https://ipapi.co/json/';
        var locParsedResponse,
            city,
            region,
            latitude,
            longitude,
            greeting,
            locHtml;
        
        var locRequest = new XMLHttpRequest();
        locRequest.onreadystatechange = function() {
            
            // check if the connection was made
            if (locRequest.readyState === 4) {
                theLoc.innerHTML = '... request received ...';
                
                // check if the API sent back OK TO GO
                if (locRequest.status === 200) {
                    // parse the JSON response
                    locParsedResponse = JSON.parse(locRequest.responseText);
                    
                    // assign response to variables
                    city = locParsedResponse.city;
                    region = locParsedResponse.region;
                    latitude = locParsedResponse.latitude;
                    longitude = locParsedResponse.longitude;
                    
                    
                    // build html
                    locHtml = '<p>' +
                        city;
                    
                    // assign to innerHtml
                    theLoc.innerHTML = locHtml;
                    
                    var wUrl = 'https://api.openweathermap.org/data/2.5/weather?lat='+latitude+'&lon='+longitude+'&APPID=b37913b4e13eb52a97731b364eddcb6a';
                    var wParsedResponse,
                        wShortName,
                        wLongName,
                        wIcon,
                        vvSmrtDeg,
                        wDegC,
                        wDegF,
                        celsius,
                        wHtml,
                        degHtml;

                    var wRequest = new XMLHttpRequest();
                    wRequest.onreadystatechange = function() {
                        if (wRequest.readyState === 4) {
                            theData.innerHTML = '... request received ...';
                            if (wRequest.status === 200) {
                                wParsedResponse = JSON.parse(wRequest.responseText);

                                wShortName = wParsedResponse.weather[0].main;
                                wLongName = wParsedResponse.weather[0].description;
                                wIcon = wParsedResponse.weather[0].icon;
                                console.log(wIcon);
                                iconurl = "http://openweathermap.org/img/wn/" + wIcon + ".png";
                                $('#wicon').attr('src', iconurl);
                                vvSmrtDeg = wParsedResponse.main.temp;

                                wDegC = Math.round(vvSmrtDeg - 273.15);
                                wDegF = Math.round((vvSmrtDeg * (9 / 5)) - 459.67);

                                wHtml = '<div>' +
                                    wShortName +
                                    '<span>(' + wLongName + ')</span>' +
                                    '<i class="wi wi-owm-' + wIcon + '"></i></div>';

                                celsius = true;
                                degHtml = wDegF + '&deg; F';
                                theDeg.innerHTML = degHtml;

                                theData.innerHTML = wHtml;

                            } else {
                                theData.innerHTML = 'Request for weather received by server, but there is a problem with response: ' + wRequest.status;
                            }
                        }
                    }

                    wRequest.open('GET', wUrl, true);
                    wRequest.send(null);
                } else {
                    theLoc.innerHTML = 'Request for location received by server, but there is a problem with response: ' + locRequest.status;
                }
            }
        }
        
        locRequest.open('GET', locUrl, true);
        locRequest.send(null);
    }

    loadLocationData();

})();


function settingClock() {
        var today = new Date();
        var hour = today.getHours();
        var minute = today.getMinutes();
        var second = today.getSeconds();
        
  
        if(hour < 10) {
                hour = "0" + hour; 
        } 
        if (minute < 10) {
                minute = "0" + minute;
        }
        if (second < 10) {
                second = "0" + second;
        }

  
        var frame = document.getElementById("time");
        frame.innerHTML = hour + ":" + minute + ":" + second;    
}

setInterval(settingClock, 500);
