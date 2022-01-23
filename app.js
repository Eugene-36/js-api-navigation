//set map options

const myLatLng = { lat: 38.346, lng: -0.4907 };
const mapOptions = {
  center: myLatLng,
  zoom: 7,
  mapTypeId: google.maps.MapTypeId.ROADMAP,
};

//create Map

const map = new google.maps.Map(
  document.getElementById('googleMap'),
  mapOptions
);

console.log(map);

console.log(mapOptions);
// create a Directions service object to use route method and get a result for our request

const directionsService = new google.maps.DirectionsService();

//create a Directions render object wich we will use to display the root

const directionsDisplay = new google.maps.DirectionsRenderer();

//bind the directionsRender to the map

directionsDisplay.setMap(map);

//function

function calcRoute() {
  //create request

  const request = {
    origin: document.getElementById('from').value,
    destination: document.getElementById('to').value,
    travelMode: google.maps.TravelMode.DRIVING, //WALKING, BYCYCLING, TRANSIT
    unitSystem: google.maps.UnitSystem.IMPERIAL,
  };

  console.log('request', request);
  //Pass the request to the route method
  directionsService.route(request, function (result, status) {
    if (status === google.maps.DirectionsStatus.OK) {
      //get distance and time
      const output = document.querySelector('#output');
      console.log('output', output);
      output.innerHTML =
        "<div class='alert-info'>From: " +
        document.getElementById('from').value +
        '.<br />To: ' +
        document.getElementById('to').value +
        ".<br /> Driving distance <i class='fas fa-road'></i> : " +
        result.routes[0].legs[0].distance.text +
        ".<br />Duration <i class='fas fa-hourglass-start'></i> : " +
        result.routes[0].legs[0].duration.text +
        '.</div>';

      //display route
      directionsDisplay.setDirections(result);
    } else {
      //delete route from map
      directionsDisplay.setDirections({ routes: [] });

      //center map in spain
      map.setCenter(myLatLng);

      //show error message
      output.innerHTML =
        "<div class='alert-danger'><i class='fas fa-exclamation-triangle'></i>Could not retrieve driving distance.</div>";
    }
  });
}
//calcRoute();
// create autocomplete objects for all input

const options = {
  types: ['(cities)'],
};

const input1 = document.getElementById('from');
const autocomplete1 = new google.maps.places.Autocomplete(input1, options);

const input2 = document.getElementById('to');
const autocomplete2 = new google.maps.places.Autocomplete(input2, options);
