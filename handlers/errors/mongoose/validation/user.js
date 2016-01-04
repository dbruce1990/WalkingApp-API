module.exports = function(err, messages){
  if(typeof err.errors.username !== 'undefined'){
    if(typeof err.errors.username.message !== 'undefined')
      messages.push(err.errors.username.message);
  }
  if(typeof err.errors.password !== 'undefined'){
    if(typeof err.errors.password.message !== 'undefined')
      messages.push(err.errors.password.message);
  }

  messages.push("User validation failed");
  return messages;
};
