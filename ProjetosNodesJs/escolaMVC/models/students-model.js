const mongoose = require('mongoose')

const Students = mongoose.model('students', {
    name: String,
    class: String,
    grades: {
        g1: Number,
        g2: Number,
        g3: Number
    },
    status: String
}); 

module.exports = Students