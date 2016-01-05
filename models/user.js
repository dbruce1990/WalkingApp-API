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
  },
  walks: [{
    type: Schema.ObjectId,
    ref: 'Walk',
  }]
});

var updatePassword = function(doc){
  /*
      This code feels like a hack, but I cannot seem to come up
    with a better solution without first retrieving the user then
    manipulating the data, and then saving it, therefor making multiple
    trips to the database...
  */
  if(typeof doc._update.$set.password !== 'undefined')
    if(doc._update.$set.password !== ''){
      doc._update.$set.password = bcrypt.hashSync(doc._update.$set.password, bcrypt.genSaltSync(10));
    }
};

User.methods.hashPassword = function(password){
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

User.methods.validatePassword = function(password){
  return bcrypt.compareSync(password, this.password);
};

User.pre('save', function(next){
  this.password = this.hashPassword(this.password);
  next();
});

User.pre('update', function(next){
  updatePassword(this); //prevents null or empty password on update
  next();
});

User.pre('findOneAndUpdate', function(next){
  updatePassword(this); //prevents null or empty password on update
  next();
});

User.pre('findByIdAndUpdate', function(next){
  updatePassword(this); //prevents null or empty password on update
  next();
});

module.exports = mongoose.model('User', User);
