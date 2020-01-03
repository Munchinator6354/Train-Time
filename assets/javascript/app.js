// Steps to complete:

// 1. Create Firebase link
// 2. Create initial train data in database
// 3. Create button for adding new trains - then update the html + update the database
// 4. Create a way to retrieve trains from the trainlist.
// 5. Create a way to calculate the time way. Using difference between start and current time.
//    Then take the difference and modulus by frequency. (This step can be completed in either 3 or 4)



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

$("add-train-button").on("click", function () {

  // Grabs user input
    var trainName = $("#trainName").val().trim();
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

    $("#trainTime").val("");
    $("#destination").val("");
    $("#firstTrain").val("");
    $("#frequency").val("");

    return false;

});

trainData.ref().on("child_added", function (childSnapshot, prevChildKey) {
    console.log(childSnapshot.val());

    var tName = childSnapshot.val().name;
})
