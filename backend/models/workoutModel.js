const mongoose = require('mongoose')


const workoutSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    title: { type: String, required: true },
    reps: { type: Number, required: true },
    load: { type: Number, required: true },
}, {
    timestamps: true
})


module.exports = mongoose.model('workout', workoutSchema)

