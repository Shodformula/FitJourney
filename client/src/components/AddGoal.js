import React, { useState } from 'react';
import axios from './AxiosInstance';

const AddGoal = ({ onGoalAdded }) => {
    const [type, setType] = useState('');
    const [target, setTarget] = useState('');
    const [deadline, setDeadline] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/goals', { type, target, deadline });
            onGoalAdded(res.data);
        } catch (err) {
            console.error(err.response.data);
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <div>
                <label>Type</label>
                <input
                    type="text"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                />
            </div>
            <div>
                <label>Target</label>
                <input
                    type="number"
                    value={target}
                    onChange={(e) => setTarget(e.target.value)}
                />
            </div>
            <div>
                <label>Deadline</label>
                <input
                    type="date"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                />
            </div>
            <button type="submit">Add Goal</button>
        </form>
    );
};

export default AddGoal;
