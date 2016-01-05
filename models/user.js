var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');

var User = new Schema({
  id: {
    type: Schema.ObjectId
  },
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

User.methods.generateHash = function(){
  this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10));
}
User.methods.validatePassword = function(password){
  var result = bcrypt.compareSync(password, this.password);
  return result;
}

User.pre('save', function(next){
  if(this.isModified)
    this.generateHash();
  next();
});

User.pre('findOneAndUpdate', function(next){
    if(typeof this._update.$set.password !== 'undefined'){
      this._update.$set.password = bcrypt.hashSync(this._update.$set.password, bcrypt.genSaltSync(10));
    }
  next();
});

module.exports = mongoose.model('User', User);
