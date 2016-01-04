module.exports = function(res, err){
  var userValidationErrors = require('./errors/mongoose/validation/user');
  var errorCodes = require('./errors/mongo/codes');

  var response = {
    success: false,
    errors:{
      messages: []
    }
  };

  var defaultMessage = function(){
    response.errors.messages.push('Something appears to have gone wrong.');
  };

  if(typeof err.code !== 'undefined')
    errorCodes();
  else{
    if(err.message == "User validation failed")
      userValidationErrors();
    else
      response.errors.messages.push("User validation failed");
  }

  return res.status(500).send(response);
};
