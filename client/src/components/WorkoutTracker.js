import React, { useState, useEffect } from 'react';
import axios from './AxiosInstance';
import AddWorkout from './AddWorkout';
import EditWorkout from './EditWorkout';

const WorkoutTracker = () => {
    const [workouts, setWorkouts] = useState([]);
    const [editingWorkoutId, setEditingWorkoutId] = useState(null);

    useEffect(() => {
        const fetchWorkouts = async () => {
            try {
                const res = await axios.get('/api/workouts');
                setWorkouts(res.data);
            } catch (err) {
                console.error(err.response.data);
            }
        };
        fetchWorkouts();
    }, []);

    const onWorkoutAdded = (workout) => {
        setWorkouts([...workouts, workout]);
    };

    const onWorkoutUpdated = (updatedWorkout) => {
        setWorkouts(
            workouts.map((workout) =>
                workout._id === updatedWorkout._id ? updatedWorkout : workout
            )
        );
        setEditingWorkoutId(null);
    };

    return (
        <div>
            <h2>Workout Tracker</h2>
            <AddWorkout onWorkoutAdded={onWorkoutAdded} />
            <ul>
                {workouts.map((workout) => (
                    <li key={workout._id}>
                        {workout.name}: {workout.type} for {workout.duration} minutes
                        <button onClick={() => setEditingWorkoutId(workout._id)}>Edit</button>
                    </li>
                ))}
            </ul>
            {editingWorkoutId && (
                <EditWorkout
                    workoutId={editingWorkoutId}
                    onWorkoutUpdated={onWorkoutUpdated}
                />
            )}
        </div>
    );
};

export default WorkoutTracker;
