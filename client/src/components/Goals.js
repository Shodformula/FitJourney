import React, { useState, useEffect } from 'react';
import axios from './AxiosInstance';
import AddGoal from './AddGoal';

const Goals = () => {
    const [goals, setGoals] = useState([]);

    useEffect(() => {
        const fetchGoals = async () => {
            try {
                const res = await axios.get('/api/goals');
                setGoals(res.data);
            } catch (err) {
                console.error(err.response.data);
            }
        };
        fetchGoals();
    }, []);

    const onGoalAdded = (goal) => {
        setGoals([...goals, goal]);
    };

    return (
        <div>
            <h2>Goals</h2>
            <AddGoal onGoalAdded={onGoalAdded} />
            <ul>
                {goals.map((goal) => (
                    <li key={goal._id}>
                        {goal.type}: {goal.target} by {new Date(goal.deadline).toLocaleDateString()}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Goals;
