function SetForm(props)
{
    return 
    (
        <div>
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
        </div>
    );
}

export default SetForm;