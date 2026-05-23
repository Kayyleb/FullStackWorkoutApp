function PersonalRecordList(props)
{
    return (
        <div>
            <h2>Personal Records</h2>

            {props.exercises.map((exercise) => (
                <div key={exercise.id}>
                    <p>
                        {exercise.name}
                        {" - "}
                        {props.getPR(exercise.id)} lbs
                    </p>
                </div>
            ))}
        </div>
    );
}

export default PersonalRecordList;