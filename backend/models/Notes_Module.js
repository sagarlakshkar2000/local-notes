
const mongoose = require('mongoose');
const { Schema } = mongoose;

const notesSchema = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    },
    title: {
        type: String,
        required: true,
        uppercase: true
    },
    description: {
        type: String,
        required: true,
    },
    tag: {
        type: String,
        default: 'General',
        uppercase: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const notes = mongoose.model('Notes', notesSchema);
module.exports = notes;
