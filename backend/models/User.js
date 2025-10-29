const mongoose = require('mongoose');

const bycrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    fullname: {type: String,required: true,},
    email: {type: String,required: true,unique: true, },
    password: {type: String,required: true, },
    profileImage: {type: String,default: null, },
}, { timestamps: true });

//  hash pasword before saving user
UserSchema.pre('save',async function (next){
    if(!this.isModified('password')){
         next();
    }
})

//  compare password method
 UserSchema.methods.comparePassword = async function (condidatePassword){
    return await bycrypt.compare(condidatePassword,this.password);
}

const User = mongoose.model('User', UserSchema);

module.exports = User;
