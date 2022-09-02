const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')


// get all workouts
exports.getWorkouts = async (req, res, next) => {
    const workouts = await Workout.find({ user: req.user } , { __v:0}).sort({ createdAt: 'desc' })
    res.status(200).json({
        message: 'fetch success',
        workouts
    })
}



// get single workout
exports.getWorkout = async (req, res, next) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({
            message: 'id is not valid'
        })
    }

    const workout = await Workout.findById(id)

    if (!workout) {
        return res.status(404).json({
            message: 'workout was not found'
        })
    }

    res.status(200).json({
        message: 'fetch success',
        workout
    })
}




//create new workout 
exports.createWorkout = async (req, res, next) => {

    const { title, load, reps } = req.body

    let emptyFields = []

    if (!title) {
        emptyFields.push('title')
    }

    if (!reps) {
        emptyFields.push('reps')
    }

    if (!load) {
        emptyFields.push('load')
    }

    if (emptyFields.length > 0) {
        return res.status(400).json({
            message: 'Please fill in all the fields',
            emptyFields
        })
    }

    try {
        const workout = await Workout.create({
            title,
            load,
            reps,
            user: req.user
        })

        res.status(200).json({
            message: 'workout inserted',
            workout
        })
    }
    catch (e) {
        next(e)
    }

}




//update workout 
exports.updateWorkout = async (req, res, next) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({
            message: 'id is not valid'
        })
    }


    const workout = await Workout.findOneAndUpdate({ _id: id }, { ...req.body }, { runValidators: true, returnOriginal: false })

    if (!workout) {
        return res.status(404).json({
            message: 'workout was not found'
        })
    }


    res.status(200).json({
        message: 'workout was updated',
        workout
    })
}



//delete workout
exports.deleteWorkout = async (req, res, next) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({
            message: 'id is not valid'
        })
    }

    const result = await Workout.deleteOne({ _id: id })

    if (result.deletedCount == 0) {
        return res.status(404).json({
            message: 'workout was not found'
        })
    }

    res.status(200).json({
        message: 'Workout was deleted '
    })
}