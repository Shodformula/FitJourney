import React, { useState } from 'react';
import axios from './AxiosInstance';

const AddWorkout = ({ onWorkoutAdded }) => {
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [duration, setDuration] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/workouts', { name, type, duration });
            onWorkoutAdded(res.data);
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
            <button type="submit">Add Workout</button>
        </form>
    );
};

export default AddWorkout;
