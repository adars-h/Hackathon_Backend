const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true
	},
	emailId: {
		type: String,
		required: true
	},
    password:{
        type:String,
        required: true
    }
});

const User = mongoose.model("User", userSchema);

function getUser(username) {
    User.findOne({username:username})
    .then(user => {
        if ( !user ) 
         return undefined;
        else 
         return user;
    })
    .catch(err => console.log(err));
}

function createUser(username,email_id,password) {
      User.create({
        emailId: email_id,
        username: username,
        password: password,
     }).then(data => {
        return data;
     }).catch(err => next(err));
}

module.exports = {
    getUser,
    createUser
}