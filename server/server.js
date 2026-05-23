// IMPORTS
const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client"); // connect to prisma

// CREATE EXPRESS APP
const app = express();
const prisma = new PrismaClient();

// SETTINGS
const PORT = 3000;

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// TEST ROUTE

app.get("/", (req, res) => {
    res.send("Workout API is running");
});


// GET ALL EXERCISES

app.get("/exercises", async (req, res) => {
    const exercises = await prisma.exercise.findMany();

    res.json(exercises);
});


// ADD EXERCISE

app.post("/exercises", async (req, res) => {
    const newExercise = await prisma.exercise.create({
        data: {
            name: req.body.name,
            muscle: req.body.muscle
        }
    });

    res.status(201).json(newExercise);
});


// GET ALL SETS

app.get("/sets", async (req, res) => {
    const sets = await prisma.workoutSet.findMany();

    res.json(sets);
});


// ADD SET

app.post("/sets", async (req, res) => {
    const newSet = await prisma.workoutSet.create({
        data: {
            exerciseId: req.body.exerciseId,
            weight: req.body.weight,
            reps: req.body.reps,
            date: new Date().toLocaleDateString()
        }
    });

    res.status(201).json(newSet);
});


// START SERVER

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});