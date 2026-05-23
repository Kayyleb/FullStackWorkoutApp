function SetForm(props)
{
    return (
        <div>
            <h2>Log Set</h2>

            <form onSubmit={props.handleAddSet}>
                <select
                    value={props.selectedExercise}
                    onChange={(event) =>
                        props.setSelectedExercise(event.target.value)
                    }
                >
                    <option value="">
                        Select Exercise
                    </option>

                    {props.exercises.map((exercise) => (
                        <option key={exercise.id} value={exercise.id}>
                            {exercise.name}
                        </option>
                    ))}
                </select>

                <input
                    type="number"
                    placeholder="Weight"
                    value={props.weight}
                    onChange={(event) => props.setWeight(event.target.value)}
                />

                <input
                    type="number"
                    placeholder="Reps"
                    value={props.reps}
                    onChange={(event) => props.setReps(event.target.value)}
                />

                <button type="submit">
                    Log Set
                </button>
            </form>
        </div>
    );
}

export default SetForm;