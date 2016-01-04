module.exports = function(){
  if(typeof err.errors.username !== 'undefined')
    if(typeof err.errors.username.message !== 'undefined')
      response.errors.messages.push(err.errors.username.message);

  if(typeof err.errors.password !== 'undefined')
    if(typeof err.errors.password.message !== 'undefined')
      response.errors.messages.push(err.errors.password.message);
};
