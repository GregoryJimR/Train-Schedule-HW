var config = {
    apiKey: "AIzaSyD_cyRnHQMuWi6UT5kjIfr8fntjCq9WKVw",
    authDomain: "fir-homework-b68a3.firebaseapp.com",
    databaseURL: "https://fir-homework-b68a3.firebaseio.com",
    projectId: "fir-homework-b68a3",
    storageBucket: "fir-homework-b68a3.appspot.com",
    messagingSenderId: "306516339885"
};
firebase.initializeApp(config);

const database = firebase.database();

$("#addTrain").on("click", function() {
    event.preventDefault();

    var name = $("#trainNameInput").val().trim();
    var destination = $("#destinationInput").val().trim();
    var startTime = $("#firstTrainTime").val().trim();
    var frequency = $("#frequencyInput").val().trim();
    var tFrequency = parseInt(frequency);

    var trainObject = {
        name: name,
        destination: destination,
        startTime: startTime,
        tFrequency: tFrequency,
    };

    $("#trainNameInput").val("");
    $("#destinationInput").val("");
    $("#firstTrainTime").val("");
    $("#frequencyInput").val("");

    database.ref().push(trainObject);

});

database.ref().on("child_added", function(snapshot, prevChildKey) {
    var name = snapshot.val().name;
    var destination = snapshot.val().destination;
    var tFrequency = snapshot.val().tFrequency;
    var startTime = snapshot.val().startTime;
    var currentTime = moment();
    //var nextArrival;
    var startTimeConverted = moment(startTime, "hh:mm").subtract(1, "years");

    var diffTime = moment().diff(moment(startTimeConverted), "minutes");

    var tRemainder = diffTime % tFrequency;

    var tMinus = tFrequency - tRemainder;

    var nextArrival = moment().add(tMinus, "minutes");

    var nextArrivalConverted = moment(nextArrival, 'milliseconds').format("HH:mm");

    $("#trainTable > tbody").append("<tr><td>" + name + "</td><td>" + destination + "</td><td>" +
        tFrequency + "</td><td>" + nextArrivalConverted + "</td><td>" + tMinus + " minutes" + "</td>");

});
