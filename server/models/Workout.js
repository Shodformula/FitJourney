const mongoose = require('mongoose');

const WorkoutSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    type: { type: String, required: true },
    duration: { type: Number, required: true },
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Workout', WorkoutSchema);
