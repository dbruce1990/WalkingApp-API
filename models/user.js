var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');

var User = new Schema({
  id: Schema.ObjectId,
  createdAt: Number,
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

User.methods.generateHash = function(pass){
  return bcrypt.hashSync(pass, bcrypt.genSaltSync(10));
}
User.methods.validatePassword = function(pass){
  return bcrypt.compareSync(pass, this.password);
}

User.pre('save', function(next){
  if(this.isModified('password'))
    this.password = this.generateHash(this.password);

  next();
});
module.exports = mongoose.model('User', User);
