const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Goal = require('../models/Goal');

// @route    GET api/goals
// @desc     Get all goals
// @access   Private
router.get('/', auth, async (req, res) => {
    try {
        const goals = await Goal.find({ userId: req.user.id });
        res.json(goals);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route    POST api/goals
// @desc     Add new goal
// @access   Private
router.post('/', auth, async (req, res) => {
    const { type, target, deadline } = req.body;

    try {
        const newGoal = new Goal({
            userId: req.user.id,
            type,
            target,
            deadline
        });

        const goal = await newGoal.save();

        res.json(goal);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route    PUT api/goals/:id
// @desc     Update a goal
// @access   Private
router.put('/:id', auth, async (req, res) => {
    const { type, target, deadline } = req.body;

    try {
        let goal = await Goal.findById(req.params.id);

        if (!goal) return res.status(404).json({ msg: 'Goal not found' });

        // Make sure user owns the goal
        if (goal.userId.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        goal = await Goal.findByIdAndUpdate(
            req.params.id,
            { $set: { type, target, deadline } },
            { new: true }
        );

        res.json(goal);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route    DELETE api/goals/:id
// @desc     Delete a goal
// @access   Private
router.delete('/:id', auth, async (req, res) => {
    try {
        let goal = await Goal.findById(req.params.id);

        if (!goal) return res.status(404).json({ msg: 'Goal not found' });

        // Make sure user owns the goal
        if (goal.userId.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        await Goal.findByIdAndRemove(req.params.id);

        res.json({ msg: 'Goal removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
