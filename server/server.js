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

const sets = [];


// ROUTES
// Home route
app.get("/", (req, res) => 
{
    res.send("Workout API is running");
});


// GET EXERCISES ROUTE

//lets the user add their own exercises
app.post("/exercises" , (req, res) => 
{
    const newExercise = 
    {
        id: exercises.length + 1,
        name: req.body.name,
        muscle: req.body.muscle
    };

    exercises.push(newExercise); // add new exercise to temp array

    res.status(201).json(newExercise); // send new exercise to react backend
});

// will grab exercises from the db
app.get("/exercises", (req, res) => {

    // send exercise array as JSON
    res.json(exercises);

});

// get all sets
app.get("/sets", (req,res) => 
{
    res.json(sets);
});

app.post("/sets", (req,res) => 
{
    const newSet = 
    {
        id: sets.length +1,
        exerciseId: req.body.exerciseId,
        weight: req.body.weight,
        reps: req.body.reps,
        date: new Date().toLocaleDateString()
    };
    sets.push(newSet);
    res.status(201).json(newSet);
});

// START SERVER
app.listen(PORT, () => {

    console.log(`Server running on http://localhost:${PORT}`);

});
