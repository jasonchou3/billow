const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    nickname: String,
});

UserSchema.statics.authenticate = () => {
  console.log('hahaha')
};

const User = mongoose.model('User', UserSchema);

export default User;
