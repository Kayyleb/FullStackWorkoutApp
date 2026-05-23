import { useEffect, useState } from "react";

function App()
{
    /*
        useState creates state variables.

        exercises:
        stores the current exercise list

        setExercises:
        function used to update exercises
    */
    const [exercises, setExercises] = useState([]);


    /*
        useEffect runs code when the component loads.

        We use it here to fetch data
        from our backend API.
    */
    useEffect(() =>
    {

        /*
            fetch sends a GET request
            to our Express backend.
        */
        fetch("http://localhost:3000/exercises")

            /*
                Convert response into JSON.
            */
            .then((response) => response.json())

            /*
                data now contains our exercise array.
            */
            .then((data) =>
            {

                console.log(data);

                // store data into React state
                setExercises(data);

            })

            /*
                catch handles errors
            */
            .catch((error) =>
            {

                console.error("Error fetching exercises:", error);

            });

    }, []);


    /*
        JSX is what React returns to display UI.
    */
    return (
        <div>

            <h1>Workout Tracker</h1>

            <h2>Exercises</h2>

            {
                /*
                    map loops through the array
                    and creates UI for each exercise.
                */
            }

            {
                exercises.map((exercise) => (

                    <div key={exercise.id}>

                        <p>
                            {exercise.name} - {exercise.muscle}
                        </p>

                    </div>

                ))
            }

        </div>
    );
}

export default App;