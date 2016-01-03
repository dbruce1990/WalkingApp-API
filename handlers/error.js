module.exports = function(res, err){
  switch(err.code){
    case 11000:
      return res.status(500).send({
        success: false,
        message: 'Duplicate found.'
      });
    default:
      return res.status(500).send('Something appears to have gone wrong.');
  }
};
