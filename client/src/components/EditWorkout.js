import React, { useState, useEffect } from 'react';
import axios from './AxiosInstance';

const EditWorkout = ({ workoutId, onWorkoutUpdated }) => {
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [duration, setDuration] = useState('');

    useEffect(() => {
        const fetchWorkout = async () => {
            try {
                const res = await axios.get(`/api/workouts/${workoutId}`);
                const { name, type, duration } = res.data;
                setName(name);
                setType(type);
                setDuration(duration);
            } catch (err) {
                console.error(err.response.data);
            }
        };
        fetchWorkout();
    }, [workoutId]);

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.put(`/api/workouts/${workoutId}`, { name, type, duration });
            onWorkoutUpdated(res.data);
        } catch (err) {
            console.error(err.response.data);
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <div>
                <label>Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div>
                <label>Type</label>
                <input
                    type="text"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                />
            </div>
            <div>
                <label>Duration</label>
                <input
                    type="number"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                />
            </div>
            <button type="submit">Update Workout</button>
        </form>
    );
};

export default EditWorkout;
