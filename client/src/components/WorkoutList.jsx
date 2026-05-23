function WorkoutList(props)
{
    return (
        <div>
            <h2>Today's Workout</h2>

            {props.sets.length === 0 ? (
                <p>No sets logged yet.</p>
            ) : (
                props.sets.map((set) => (
                    <div key={set.id}>
                        <p>
                            {props.getExerciseName(set.exerciseId)}
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

export default WorkoutList;