module.exports = function(res, err){
    switch(err.code){
      case 11000:
              return res.send('Duplicate found.').status(500);
      default:
        return res.send('Something appears to have gone wrong.').status(500);
    }
};
