const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Workout = require('../models/Workout');

// @route    GET api/workouts
// @desc     Get all workouts
// @access   Private
router.get('/', auth, async (req, res) => {
    try {
        const workouts = await Workout.find({ userId: req.user.id });
        res.json(workouts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route    POST api/workouts
// @desc     Add new workout
// @access   Private
router.post('/', auth, async (req, res) => {
    const { name, type, duration } = req.body;

    try {
        const newWorkout = new Workout({
            userId: req.user.id,
            name,
            type,
            duration
        });

        const workout = await newWorkout.save();

        res.json(workout);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route    PUT api/workouts/:id
// @desc     Update a workout
// @access   Private
router.put('/:id', auth, async (req, res) => {
    const { name, type, duration } = req.body;

    try {
        let workout = await Workout.findById(req.params.id);

        if (!workout) return res.status(404).json({ msg: 'Workout not found' });

        // Make sure user owns the workout
        if (workout.userId.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        workout = await Workout.findByIdAndUpdate(
            req.params.id,
            { $set: { name, type, duration } },
            { new: true }
        );

        res.json(workout);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route    DELETE api/workouts/:id
// @desc     Delete a workout
// @access   Private
router.delete('/:id', auth, async (req, res) => {
    try {
        let workout = await Workout.findById(req.params.id);

        if (!workout) return res.status(404).json({ msg: 'Workout not found' });

        // Make sure user owns the workout
        if (workout.userId.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        await Workout.findByIdAndRemove(req.params.id);

        res.json({ msg: 'Workout removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
