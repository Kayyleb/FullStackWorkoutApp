import { useEffect, useState } from "react";

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


    return (
        <div>

            <h1>Workout Tracker</h1>


            {/* ADD EXERCISE FORM */}

            <h2>Add Exercise</h2>

            <form onSubmit={handleAddExercise}>

                <input
                    type="text"
                    placeholder="Exercise name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                />

                <input
                    type="text"
                    placeholder="Muscle group"
                    value={muscle}
                    onChange={(event) => setMuscle(event.target.value)}
                />

                <button type="submit">
                    Add Exercise
                </button>

            </form>


            {/* LOG SET FORM */}

            <h2>Log Set</h2>

            <form onSubmit={handleAddSet}>

                <select
                    value={selectedExercise}
                    onChange={(event) =>
                        setSelectedExercise(event.target.value)
                    }
                >

                    <option value="">
                        Select Exercise
                    </option>

                    {exercises.map((exercise) => (

                        <option
                            key={exercise.id}
                            value={exercise.id}
                        >
                            {exercise.name}
                        </option>

                    ))}

                </select>


                <input
                    type="number"
                    placeholder="Weight"
                    value={weight}
                    onChange={(event) => setWeight(event.target.value)}
                />

                <input
                    type="number"
                    placeholder="Reps"
                    value={reps}
                    onChange={(event) => setReps(event.target.value)}
                />

                <button type="submit">
                    Log Set
                </button>

            </form>


            {/* DISPLAY SETS */}

            <h2>Logged Sets</h2>

            {sets.map((set) => (

                <div key={set.id}>

                    <p>

                        {getExerciseName(set.exerciseId)}
                        {" - "}
                        {set.weight} lbs x {set.reps} reps on {set.date}

                    </p>

                </div>

            ))}

        </div>
    );
}

export default App;