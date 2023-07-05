const GameController = require('../controllers/game.controller')

module.exports = (app) => {
  app.post('/games', GameController.createOne)
  app.get('/games', GameController.getAll)
  app.get('/games/:id', GameController.getOne)
  app.put('/games/update/:id', GameController.updateOne)
  app.delete('/games/delete/:id', GameController.deleteOne)
  app.post('/api/user/comefindme', GameController.comefindme)
  app.post('/games/fetch', GameController.fetch)
  app.post('/builder', GameController.builder)
}
