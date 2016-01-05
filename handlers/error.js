module.exports = function(res, err){
  var errorCodes = require('./errors/mongo/codes');
  var userValidationErrors = require('./errors/mongoose/validation/user');

  var messages = [];

  var defaultMessage = function(){
    messages.push('Something appears to have gone wrong.');
  };

  if(typeof err.code !== 'undefined'){
    messages = errorCodes(err, messages);
  }
  else if(err.name == 'ValidationError')
      for(var error in err.errors){
        var message = err.errors[error].message;
        messages.push(message);
      }
  else{
    defaultMessage();
  }
  var response = {
    success: false,
    errors:{
      messages: messages
    }
  };
  return res.status(500).send(response);
};
