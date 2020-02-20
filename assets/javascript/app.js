// Steps to complete:

// 1. Create Firebase link
// 2. Create initial train data in database
// 3. Create button for adding new trains - then update the html + update the database
// 4. Create a way to retrieve trains from the trainlist.
// 5. Create a way to calculate the time way. Using difference between start and current time.
// Then take the difference and modulus by frequency. (This step can be completed in either 3 or 4)



// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAM4oGeM4lbNjfF6LhlxDPgTbdxUtjsWlk",
    authDomain: "train-time-b8739.firebaseapp.com",
    databaseURL: "https://train-time-b8739.firebaseio.com",
    projectId: "train-time-b8739",
    storageBucket: "train-time-b8739.appspot.com",
    messagingSenderId: "836103653900",
    appId: "1:836103653900:web:11b5cd384e8ab72d9bfc29"
};

/* Initialize Firebase */

firebase.initializeApp(firebaseConfig);

var trainData = firebase.database();

// 2. Populate Firebase Database with initial data (in this case, I did this via Firebase GUI)
// 3. Button for adding trains

$("#train-add-button").on("click", function () {
    event.preventDefault();

  // Grabs user input
    var trainName = $("#trainName").val().trim();
    console.log(trainName);
    var destination = $("#destination").val().trim();
    var firstTrain = $("#firstTrain").val().trim();
    var frequency = $("#frequency").val().trim();


    // Creates local "temporary" object for holding train data

    var newestTrain = {
        name: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency
    };

    trainData.ref().push(newestTrain);

    console.log(newestTrain.name);
    console.log(newestTrain.destination);
    console.log(newestTrain.firstTrain);
    console.log(newestTrain.frequency);

    alert("Train successfully added!");

    $("#trainName").val("");
    $("#destination").val("");
    $("#firstTrain").val("");
    $("#frequency").val("");

    return false;

});

// 4. Create Firebase event for adding trains to the database and a row in the html when a user adds an entry
trainData.ref().on("child_added", function (childSnapshot, prevChildKey) {
    console.log(childSnapshot.val());

    // Storing info into variables
    var tName = childSnapshot.val().name;
    var tDestination = childSnapshot.val().destination;
    var tFrequency = childSnapshot.val().frequency;
    var tFirstTrain = childSnapshot.val().firstTrain

    var timeArr = tFirstTrain.split(":");
    var trainTime = moment().hours(timeArr[0]).minutes(timeArr[1]);
    var maxMoment = moment.max(moment(), trainTime);
    var tMinutes;
    var tArrival;

    // If the first train is later than the current time, sent arrival to the first train time
    if (maxMoment === trainTime) {
        tArrival = trainTime.format("hh:mm A");
        tMinutes = trainTime.diff(moment(), "minutes");
    } else {
        // Calculate minutes until arrival
        // Take current time in unix and subtract first train time.
        let differenceTimes = moment().diff(trainTime, "minutes");
        let tRemainder = differenceTimes % tFrequency;
        tMinutes = tFrequency - tRemainder;
        // To calculate arrival time, add the tMinutes to the current time
        tArrival = moment().add(tMinutes, "m").format("hh:mm A");
    }
    console.log("tMinutes:", tMinutes);
    console.log("tArrival", tArrival);

    //Add each train's data into the table

    $("#trainTableBody").append(
        $("<tr>").append(
            $("<th>").text(tName),
            $("<td>").text(tDestination),
            $("<td>").text(tFrequency),
            $("<td>").text(tArrival),
            $("<td>").text(tMinutes),
        )
    );




});


