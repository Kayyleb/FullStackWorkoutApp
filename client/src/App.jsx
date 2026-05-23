import { useEffect, useState } from "react";

function App()
{
    const [exercises, setExercises] = useState([]);

    // These store what the user types in the form
    const [name, setName] = useState("");
    const [muscle, setMuscle] = useState("");

    useEffect(() =>
    {
        fetch("http://localhost:3000/exercises")
            .then((response) => response.json())
            .then((data) => setExercises(data))
            .catch((error) => console.error("Error fetching exercises:", error));
    }, []);

    function handleAddExercise(event)
    {
        // prevents page refresh
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
            })
            .catch((error) => console.error("Error adding exercise:", error));
    }

    return (
        <div>
            <h1>Workout Tracker</h1>

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

                <button type="submit">Add Exercise</button>
            </form>

            <h2>Exercises</h2>

            {exercises.map((exercise) => (
                <div key={exercise.id}>
                    <p>{exercise.name} - {exercise.muscle}</p>
                </div>
            ))}
        </div>
    );
}

export default App;