// Initlaises the javascript for materialize
M.AutoInit();

// Terms and coditions window
document.addEventListener('DOMContentLoaded', function() {
  var elemsModal = document.querySelectorAll('.modal');
  var instances = M.Modal.init(elemsModal, preventScrolling=true);
});

document.addEventListener('DOMContentLoaded', function() {
  var options = {
    autoClose: true,
    showClearBtn: true,
    minDate: new Date(),
    maxDate: new Date(2021,0,1),
    defaultDate: new Date(),
  }
  elemsdpE = document.querySelectorAll('.datepickerEarliest');
  var instances = M.Datepicker.init(elemsdpE, options);
  // M.Datepicker.getInstance($('.datepickerEarliest')).date;
});

document.addEventListener('DOMContentLoaded', function() {
  var options = {
    autoClose: true,
    showClearBtn: true,
    minDate: new Date(),
    maxDate: new Date(2021,0,1),
    defaultDate: new Date(),
  }
  elemsdpL = document.querySelectorAll('.datepickerLatest');
  var instances = M.Datepicker.init(elemsdpL, options);
  instanceLatest = M.Datepicker.getInstance(elemsdpL);
});

document.addEventListener('DOMContentLoaded', function() {
  var options = {
  }
  var elems = document.querySelectorAll('select');
  var instances = M.FormSelect.init(elems, options);
});

document.addEventListener('DOMContentLoaded', function() {
  var options ={defaultTime: '11',
      timeFormat: 'h:mm p',
      interval: 15,
      defaultTime: '11',
      startTime: '00:00',
      dynamic: false,
      dropdown: true,
      scrollbar: true,
      twelveHour: false
    }
  elemsTP = document.querySelectorAll('.timepicker');
  var instances = M.Timepicker.init(elemsTP, options);
  instanceTimePicker = M.Timepicker.getInstance(elemsTP);

});


// //Calls james' function - need to change the name of the other function though
// function myembedjs(){
//   window.location.replace("results.html");
//   findBestTimeCaller()
// }

function getEarliestDate(){
  try {
    earliestDateSet = M.Datepicker.getInstance($('.datepickerEarliest')).date;
  } catch (e) {
  }

}

function getLatestDate(){
  try {
    latestDateSet = M.Datepicker.getInstance($('.datepickerLatest')).date;

  } catch (e) {

  }
}



function getTime(){
  try {
    timeSet = M.Timepicker.getInstance($('.timepicker')).time;
    timeSet = timeSet.replace(/(^\d+)(.+$)/i,'$1'); //=> '123'
  } catch (e) {

  }
}

function getHoursSpent(){
  try {
    // hoursSpentInstance = M.FormSelect.getInstance($('.lengthOfStay'));
    timeSpent = document.getElementById("lengthOfStayID").value;

  } catch (e) {

  }
}

function getLocationName(){
  try {
    locationName = document.getElementById("autocomplete").value;
  } catch (e) {

  }
}

function getCalToken(){
  calTokenIn = document.getElementById("calTokenID").value;
}




//James' function
function myembedjs(){

  // gets all values from the front page
  getLatestDate();
  getEarliestDate();
  getTime();
  getHoursSpent();
  getCalToken();
  getLocationName();

  try {
    var r = returnedPlaceID;
  }
  catch (e) {
    alert("You did not enter a location");
  }

  // var rtndObj = findBestTime(new Date(2020, 1, 2), new Date(2020, 1, 04), 9, 17, 60, returnedPlaceID, "**API KEY HIDDEN**-GJC_BIDpU", calTokenIn);

  var rtndObj = findBestTime(earliestDateSet, latestDateSet, 0, timeSet, timeSpent, returnedPlaceID, "**API KEY HIDDEN**-GJC_BIDpU", calTokenIn);

  var startDT = rtndObj[0];
  var endDT = rtndObj[1];

  window.location.href = ("./results.php?startDT=" + startDT + "&endDT=" + endDT + "&locationName=" + locationName);

}


function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}


//original
//  alert(findBestTime(new Date(2020, 1, 2), new Date(2020, 1, 04), 9, 17, 60, "ChIJeziKgJKxe0gR8qUIiSmWKJo", "**API KEY HIDDEN**-GJC_BIDpU"));


//ChIJeziKgJKxe0gR8qUIiSmWKJo PLACE ID ORIGINAL
//document.getElementByID('placeIDfromSearchBox')
