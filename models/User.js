const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')
const SALT_FACTOR = 10

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    }
})

const bcryptHelper = function() {} // bcrypt needs a blank function

userSchema.pre('save', function(done){
    const user = this
    if(!user.isModified('password')){
        return done()
    }
    // assuming password is changed, we need to re-hash it
    bcrypt.genSalt(SALT_FACTOR, function(err, salt){
        if(err){
            return done(err)
        }
        bcrypt.hash(user.password, salt, bcryptHelper, function(err, hashedPassword){
            if(err){
                done(err)
            }
            user.password = hashedPassword
            done()
        })
    })
})


// Make a helper function that will check to see if the passwords are equal
userSchema.methods.checkPassword = function(submittedPassword, done){
    bcrypt.compare(submittedPassword, this.password, function(err, isMatch){
        done(err, isMatch)
    })
}

// Register our User object with Mongoose for use in our application
const User = mongoose.model('User', userSchema)
module.exports = User
