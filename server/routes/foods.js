const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Food = require('../models/Food');

// @route    GET api/foods
// @desc     Get all foods
// @access   Private
router.get('/', auth, async (req, res) => {
    try {
        const foods = await Food.find({ userId: req.user.id });
        res.json(foods);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route    POST api/foods
// @desc     Add new food
// @access   Private
router.post('/', auth, async (req, res) => {
    const { name, calories } = req.body;

    try {
        const newFood = new Food({
            userId: req.user.id,
            name,
            calories
        });

        const food = await newFood.save();

        res.json(food);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route    PUT api/foods/:id
// @desc     Update a food
// @access   Private
router.put('/:id', auth, async (req, res) => {
    const { name, calories } = req.body;

    try {
        let food = await Food.findById(req.params.id);

        if (!food) return res.status(404).json({ msg: 'Food not found' });

        // Make sure user owns the food
        if (food.userId.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        food = await Food.findByIdAndUpdate(
            req.params.id,
            { $set: { name, calories } },
            { new: true }
        );

        res.json(food);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route    DELETE api/foods/:id
// @desc     Delete a food
// @access   Private
router.delete('/:id', auth, async (req, res) => {
    try {
        let food = await Food.findById(req.params.id);

        if (!food) return res.status(404).json({ msg: 'Food not found' });

        // Make sure user owns the food
        if (food.userId.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        await Food.findByIdAndRemove(req.params.id);

        res.json({ msg: 'Food removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
