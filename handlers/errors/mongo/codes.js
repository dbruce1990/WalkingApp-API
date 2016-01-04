module.exports = function(){
  switch(err.code){
    case 11000:
      response.errors.messages.push('Duplicate found.');
      break;
    default:
      response.errors.messages.push(defaultMessage);
      break;
  }
};
