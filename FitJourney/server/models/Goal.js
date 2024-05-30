const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true },
    target: { type: Number, required: true },
    deadline: { type: Date, required: true },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Goal', goalSchema);
