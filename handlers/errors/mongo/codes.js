module.exports = function(err, messages){
  switch(err.code){
    case 11000:
      messages.push('Duplicate found.');
      break;
    default:
      messages.push(defaultMessage);
      break;
  }
  return messages;
};
