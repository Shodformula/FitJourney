import React, { useState, useEffect } from 'react';
import axios from './AxiosInstance';
import AddFood from './AddFood';

const FoodTracker = () => {
    const [foods, setFoods] = useState([]);

    useEffect(() => {
        const fetchFoods = async () => {
            try {
                const res = await axios.get('/api/foods');
                setFoods(res.data);
            } catch (err) {
                console.error(err.response.data);
            }
        };
        fetchFoods();
    }, []);

    const onFoodAdded = (food) => {
        setFoods([...foods, food]);
    };

    return (
        <div>
            <h2>Food Tracker</h2>
            <AddFood onFoodAdded={onFoodAdded} />
            <ul>
                {foods.map((food) => (
                    <li key={food._id}>
                        {food.name}: {food.calories} calories
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FoodTracker;
