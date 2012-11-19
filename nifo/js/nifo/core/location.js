 var Location = (function () 
{
    Location = function () {

    };
        
    Location.prototype.init = function()
    {
        this.location = store.get("Location");
        if (this.location != null)
        { // we already know last user location. 
          // TODO: store it as previous location. Why? :)
        }
        
        // check results from if IP location 
        var isIPLocationReady =  this.getGeoLocationByIP();

        // call browser geolocation. Assume that after getting results this.location
        this.getGeoLocation();
    };
    

     Location.prototype.getGeoLocationByIP = function()
     {
        // assume that required js http://api.easyjquery.com/easyjquery.js 
        // already  loaded to the page
        try
        {
            EasyjQuery_Get_IP("updateLocationByIP", "full");
        }
        catch (err)
        {
            return false;
        }
        
        return true;
     }

    Location.prototype.updateUI = function()
    {
        try
        {
            this.location = store.get("Location");

            //this.location.lat= 41; this.location.lng = -75;
            map.setLocation(this.location.lat,this.location.lng);
        }
        catch (err)
        {
            
        }
    }
         
    Location.prototype.updateLocationByGData = function (data)
    {
        var location = store.get("Location");
        if ( location == undefined)
        {
            location = {};
        }
        location.city = data[0].address_components[2].long_name;
        location.country = data[0].address_components[4].long_name;

        store.set("Location",location);
        
    }
    
    // location Info updated event
    Location.prototype.getLocationInfo = function(lat, lng)
    {
        try
        {
            var geocoder = new google.maps.Geocoder();
            var latlng = new google.maps.LatLng(lat, lng);
            geocoder.geocode({'latLng':latlng}, 
                    function(results, status) {
                    if(status == 'OK'){
                        this.updateLocationByGData(results);
                        this.updateUI();
                    };
            });
        }
        catch ( err )
        {
            console.log('err while get location info' + err);
            return false;
        }
        return true;
    }
    
    // 
    Location.prototype.getGeoLocation = function()
    {
    if (navigator.geolocation) // check if browser support this feature or not
    {
        navigator.geolocation.getCurrentPosition(
            function(position)
            {
                // create temporal variable with location
                var loc = store.get("Location");
                if (loc == undefined)
                {
                    loc = {};
                }
                loc.lat = position.coords.latitude;
                loc.lng = position.coords.longitude;
                store.set("Location",loc);

                
                // Get information about location
                 var geocoder = new google.maps.Geocoder();

                 var latlng = new google.maps.LatLng(loc.lat, loc.lng);
                 geocoder.geocode({'latLng':latlng}, 
                    function(results, status) {
                        if(status == 'OK'){
                            locationInstance.updateLocationByGData(results);
                            locationInstance.updateUI();
                    };
            });
        }
        );
    };
    };
   
   return Location;
})();
 
 updateLocationByIP = function (data)
    {
            var loc =  {};

            loc.source = 'IP';
            loc.IP = data.IP;
            loc.country = data.countryName;
            loc.countryCode3 = data.countryCode3;

            if (data.cityName != 'unknown')
            {
                loc.city = data.cityName;
                loc.lat = data.cityLatitude;
                loc.lng = data.cityLongitude;
            }
            else
            {
                loc.city = data.cityName;
                loc.lat = data.countryLatitude;
                loc.lng = data.countryLongitude;
            }

            store.set("Location", loc);
             locationInstance.updateUI();
    }
