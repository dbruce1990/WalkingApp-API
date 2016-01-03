module.exports = function(res, err){
  var response = {
    success: false,
    message: ""
  };

  var defaultResponse = function(){
    return 'Something appears to have gone wrong.';
  };
  var errorCodes = function(){
    switch(err.code){
      case 11000:
        return 'Duplicate found.';
      default:
        return 'duh something went wrong?!?!';
    }
  };

  var userValidationErrors = function(){
    if(typeof err.errors.username !== 'undefined'){
      if(typeof err.errors.username.message !== 'undefined')
        return err.errors.username.message;
    }
    else if(typeof err.errors.password !== 'undefined'){
      if(typeof err.errors.password.message !== 'undefined')
        return err.errors.password.message;
    }
    else
      return "User validation failed";
  };

  if(typeof err.code !== 'undefined'){
    response.message = errorCodes();
  }
  else{
    if(err.message == "User validation failed"){
      response.message = userValidationErrors();
    }
    else{
      response.message = defaultResponse();
    }
  }
  return res.status(500).send(response);
};
