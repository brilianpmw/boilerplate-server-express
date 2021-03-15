module.exports = function (app) {
  let Home = require('../api/routes/Home');
  app.use('/', Home);
}
