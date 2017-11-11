const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    nickname: String,
});

const User = mongoose.model('User', UserSchema);

export default User;

// module.exports = User;
