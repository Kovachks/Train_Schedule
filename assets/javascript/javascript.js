  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDE2V6ic5_j6HFgpoQzd2tF_3hngEM8GXI",
    authDomain: "train-schedule-a2adb.firebaseapp.com",
    databaseURL: "https://train-schedule-a2adb.firebaseio.com",
    projectId: "train-schedule-a2adb",
    storageBucket: "train-schedule-a2adb.appspot.com",
    messagingSenderId: "729415452315"
  };
  firebase.initializeApp(config);

//----------------------Universal Variables-----------------
var database = firebase.database();

//--------------------------Formulas------------------

database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val().employeeName)

    var firstTimeConverted = moment(childSnapshot.val().firstTrainTime, "hh:mm").subtract(1, "years");

    var currentTime = moment();

    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

    var remainder = diffTime % childSnapshot.val().frequency;

    var minutesUntilTrain = childSnapshot.val().frequency - remainder;

    var nextTrain = moment().add(minutesUntilTrain, "minutes").format("hh:mm a");

    $("#mainTable").append("<tr><td>" + childSnapshot.val().trainName + "</td><td>" + childSnapshot.val().destination + "</td><td>" + childSnapshot.val().frequency + "</td><td>" + nextTrain + "</td><td>"  + minutesUntilTrain +   "</td></tr>")

})

//Initiated on click event for submit button to collect data
$("#submitButton").on("click", function() {

    //stops the default action of an element from happening
    event.preventDefault();

    //Logging the inputs as their own variables
    var trainName = $("#name").val().trim();
    var destination = $("#destination").val().trim();
    var firstTrainTime = $("#firstTrain").val().trim();
    var frequency = $("#frequency").val().trim();

    //pushing the data collected to our firebase database
    database.ref().push({
        trainName: trainName,
        destination: destination,
        firstTrainTime: firstTrainTime,
        frequency: frequency,
    });

    //Clearing previously entered items from the input fields
    $("input").val("");
})

