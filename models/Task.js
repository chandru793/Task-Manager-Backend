const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Must provide a name'],
        trim:true,
        maxlength:[50,'Name cannot be more than 50 characters']
    },
    description: {
        type: String,
        required: [true, 'Must provide a description'],
        trim: true,
        maxlength:[500,'Description cannot be more than 500 characters']
    },
    completed: {
        type: Boolean,
        default: false
    },
    dolater: {
        type: Boolean,
        default: false
    },
})

module.exports=mongoose.model('Task',TaskSchema)