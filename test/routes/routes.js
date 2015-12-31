var app = require('../../app');
var agent = require('supertest').agent(app);

require('./index')(agent);
require('./users')(agent);
