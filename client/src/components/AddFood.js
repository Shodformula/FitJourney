import React, { useState } from 'react';
import axios from './AxiosInstance';

const AddFood = ({ onFoodAdded }) => {
    const [name, setName] = useState('');
    const [calories, setCalories] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/foods', { name, calories });
            onFoodAdded(res.data);
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
                <label>Calories</label>
                <input
                    type="number"
                    value={calories}
                    onChange={(e) => setCalories(e.target.value)}
                />
            </div>
            <button type="submit">Add Food</button>
        </form>
    );
};

export default AddFood;
