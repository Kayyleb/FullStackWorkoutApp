function ExerciseForm(props)
{
    return (
        <div>
            <h2>Add Exercise</h2>

            <form onSubmit={props.handleAddExercise}>
                <input
                    type="text"
                    placeholder="Exercise name"
                    value={props.name}
                    onChange={(event) => props.setName(event.target.value)}
                />

                <input
                    type="text"
                    placeholder="Muscle group"
                    value={props.muscle}
                    onChange={(event) => props.setMuscle(event.target.value)}
                />

                <button type="submit">
                    Add Exercise
                </button>
            </form>
        </div>
    );
}

export default ExerciseForm;