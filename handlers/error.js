module.exports = function(res, err){
  var errorCodes = require('./errors/mongo/codes');
  var userValidationErrors = require('./errors/mongoose/validation/user');

  var messages = [];

  var defaultMessage = function(){
    messages.push('Something appears to have gone wrong.');
  };

  if(typeof err.code !== 'undefined')
    messages = errorCodes(err, messages);
  else if(err.message == "User validation failed")
    messages = userValidationErrors(err, messages);
  else
    defaultMessage();

  var response = {
    success: false,
    errors:{
      messages: messages
    }
  };
  return res.status(500).send(response);
};
