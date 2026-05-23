// IMPORTS

const express = require("express");
const cors = require("cors");


// CREATE EXPRESS APP

const app = express();


// SETTINGS

const PORT = 3000;


// MIDDLEWARE

app.use(cors());
app.use(express.json());


// TEMPORARY DATA

// This is fake data for now.
// Later this will come from SQLite.

const exercises = [

    {
        id: 1,
        name: "Bench Press",
        muscle: "Chest"
    },

    {
        id: 2,
        name: "Squat",
        muscle: "Legs"
    },

    {
        id: 3,
        name: "Deadlift",
        muscle: "Back"
    }

];


// ROUTES

// Home route
app.get("/", (req, res) => {

    res.send("Workout API is running");

});


// GET EXERCISES ROUTE

// When frontend requests:
// http://localhost:3000/exercises
//
// this route runs

app.get("/exercises", (req, res) => {

    // send exercise array as JSON
    res.json(exercises);

});


// START SERVER

app.listen(PORT, () => {

    console.log(`Server running on http://localhost:${PORT}`);

});
