const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 4,
    }
});

UserSchema.pre('save', function(next){
    console.log('pre save hook');

    next();
})

module.exports = mongoose.model('User', UserSchema);