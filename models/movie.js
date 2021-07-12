const Joi = require('joi');
const mongoose = require('mongoose');
const {genreSchema} = require('../models/genre')

const Movie = mongoose.model('Movie',new mongoose.Schema({
    title:{
        type:String,
        required:true,
        minlength:5,
        maxlength:255
    },
    genre: {
        type: genreSchema,
        required: true
    },
    numberinStock:{
        type:Number,
        required: true,
        min:1,
        max:6
    },
    DailyRentalRate:{
        type:Number,
        required: true,
        min:1,
        max:6
    },
}))

function validateMovie(movie){
    const schema = {
        title: Joi.string().required().min(5).max(255),
        genreId:Joi.objectId().required(),
        numberinStock: Joi.number().required().min(1).max(6),
        DailyRentalRate: Joi.number().required().min(1).max(6),
    }

    return Joi.validate(movie, schema)
}

exports.Movie = Movie;
exports.validate = validateMovie;