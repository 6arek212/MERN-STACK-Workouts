require('dotenv').config()
const express = require('express')
const cors = require('cors');
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workout')
const userRoutes = require('./routes/user')


const app = express()

app.use(cors());

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('connected to MONGODB');
    })
    .catch(e => console.log(e))



mongoose.set('debug', true);


app.use(express.json())


//Routes
app.use('/api/workouts', workoutRoutes)
app.use('/api/users', userRoutes)



//handling all errors
app.use((error, req, res, next) => {
    console.log(error.message)
    res.status(error.status || 500);
    res.json({
        message: error.message
    })
});


app.listen(process.env.PORT, () => {
    console.log('listening on port', process.env.PORT);
})
