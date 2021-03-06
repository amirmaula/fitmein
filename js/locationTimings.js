var locationArray = [];
var idArray = [];
var timeTaken;

function getLatLong(placeID, apiKey){
	var location;

	var urlCoord = "getCoordinates.php?placeID=" + placeID + "&apiKey=" + apiKey;
  	var returnObjCoord = undefined;
  	var wasErrorObtainingCoord = false;
  	try {
    	returnObjCoord = getSynchr(urlCoord);
  	}
  	catch(err) {
    	return "ERROR_OBTAINING_OPENING_HOURS";
    	wasErrorObtainingCoord = true;
    }

    if (wasErrorObtainingCoord == false) {
    	if (returnObjOH[0] == "200") {

    		location = new google.maps.LatLng( returnObjCoord[1].latitude, returnObjCoord[1].longitude );
    		locationArray.push(location);
				idArray.push(placeID);
    	}
    }

}

function pairLocations(){
	var itineraryResults;
														//called when search button hit
	timeTaken = new Array(locationArray.length);
	for (var i = 0; i < locationArray.length; ++i)
		timeTaken[i] = new Array(locationArray.length);

	for (var i = 0; i < locationArray.length; ++i)
		for (var j = i + 1; j < locationArray.length; ++j)
			getTimings(i, j);		//calls getTimings multiple times, to complete matrix

	itineraryResults = itinerary(timeTaken);

	var totalTime = itineraryResults[0];
	var route = itineraryResults[1];
	for (var i = 0; i < route.length; ++i)
		route[i] = idArray[route[i]];

	totalTime = totalTime.toString();
	var routeLength = route.length;
	routeLength = routeLength.toString();
	var strRoute = route.toString();

	var urlItin = "resultsItinerary.php?routeTime=" + totalTime + "&routeLength=" + routeLength + "&routeOrder=" + strRoute;

}

function getTimings(locationOneIndex, locationTwoIndex){

	var directionsService = new google.maps.DirectionsService();
	var request = {
	    origin: locationArray[locationOneIndex], // LatLng|string
	    destination: locationArray[locationTwoIndex], // LatLng|string
	    travelMode: google.maps.DirectionsTravelMode.WALKING
	};

	directionsService.route( request, function( response, status ) {

	    if ( status === 'OK' ) {
	        var point = response.routes[ 0 ].legs[ 0 ];
	        timeTaken[locationOneIndex][locationTwoIndex] = timeTaken[locationTwoIndex][locationOneIndex] = parseFloat(point.duration.text);


	        // $( '#travel_data' ).html( 'Estimated travel time: ' + point.duration.text + ' (' + point.distance.text + ')' );
	    }



	} );

}




function getSynchr(urlToGet) { // Make an HTTP request synchronously (i.e. wait for the response before continuing)
    var httpReq = new XMLHttpRequest();
    httpReq.open("GET", urlToGet, false);
    httpReq.send(null);
    var getSynchrReturnObj = [];
    getSynchrReturnObj.push(httpReq.status); // 200 = successful
    getSynchrReturnObj.push(httpReq.responseText);
    return getSynchrReturnObj;
}
