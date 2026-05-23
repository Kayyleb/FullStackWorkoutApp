import { useEffect, useState } from "react";
import ExerciseForm from "./components/ExerciseForm";
import PersonalRecordList from "./components/PersonalRecordList";
import SetForm from "./components/SetForm";
import WorkoutList from "./components/WorkoutList";

function App()
{
    const [exercises, setExercises] = useState([]);
    const [sets, setSets] = useState([]);

    const [name, setName] = useState("");
    const [muscle, setMuscle] = useState("");

    // NEW SET FORM STATE
    const [selectedExercise, setSelectedExercise] = useState("");
    const [weight, setWeight] = useState("");
    const [reps, setReps] = useState("");


    // LOAD EXERCISES
    useEffect(() =>
    {
        fetch("http://localhost:3000/exercises")
            .then((response) => response.json())
            .then((data) => setExercises(data));
    }, []);


    // LOAD SETS
    useEffect(() =>
    {
        fetch("http://localhost:3000/sets")
            .then((response) => response.json())
            .then((data) => setSets(data));
    }, []);


    // ADD EXERCISE
    function handleAddExercise(event)
    {
        event.preventDefault();

        const newExercise = {
            name: name,
            muscle: muscle
        };

        fetch("http://localhost:3000/exercises", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newExercise)
        })
            .then((response) => response.json())
            .then((savedExercise) =>
            {
                setExercises([...exercises, savedExercise]);

                setName("");
                setMuscle("");
            });
    }


    // ADD SET
    function handleAddSet(event)
    {
        event.preventDefault();

        const newSet = {

            exerciseId: Number(selectedExercise),

            weight: Number(weight),

            reps: Number(reps)

        };

        fetch("http://localhost:3000/sets", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(newSet)

        })
            .then((response) => response.json())
            .then((savedSet) =>
            {

                setSets([...sets, savedSet]);

                setWeight("");
                setReps("");

            });
    }


    // FIND EXERCISE NAME FROM ID
    function getExerciseName(exerciseId)
    {
        const exercise = exercises.find(
            (exercise) => exercise.id === exerciseId
        );

        return exercise ? exercise.name : "Unknown";
    }

    // FIND PR FOR AN EXERCISE

function getPR(exerciseId)
{
    // get all sets for this exercise
    const exerciseSets = sets.filter(
        (set) => set.exerciseId === exerciseId
    );

    // no sets yet
    if (exerciseSets.length === 0)
    {
        return 0;
    }

    /*
        Math.max finds largest number.

        map extracts only the weights.
    */
    return Math.max(
        ...exerciseSets.map((set) => set.weight)
    );
}


    return (
        <div>

            <h1>Workout Tracker</h1>

            {/* ADD EXERCISE FORM */}
            <ExerciseForm
              name={name}
              muscle={muscle}
              setName={setName}
              setMuscle={setMuscle}
              handleAddExercise={handleAddExercise}
            />

            {/* LOG SET FORM */}
            <SetForm
              exercises={exercises}
              selectedExercise={selectedExercise}
              setSelectedExercise={setSelectedExercise}
              weight={weight}
              setWeight={setWeight}
              reps={reps}
              setReps={setReps}
              handleAddSet={handleAddSet}
            />

            {/* DISPLAY SETS */}

            {/* TODAY'S WORKOUT */}

            {/* PERSONAL RECORDS */}
            <PersonalRecordList
              exercises={exercises}
              getPR={getPR}
            />

<h2>Today's Workout</h2>

{sets.length === 0 ? (

    <p>No sets logged yet.</p>

) : (

    sets.map((set) => (

        <div key={set.id}>

            <p>
                {getExerciseName(set.exerciseId)}
                {" - "}
                {set.weight} lbs x {set.reps} reps
                {" | "}
                {set.date}
            </p>

        </div>

    ))

)}

        </div>
    );
}

export default App;