const express = require('express');
const BlagueController = require('../controllers/blagueController');

const router = express.Router();

// Routes pour les blagues
router.get('/', BlagueController.getAllBlagues);
router.get('/random', BlagueController.getRandomBlague); // Doit être avant /:id
router.get('/:id', BlagueController.getBlagueById);
router.post('/', BlagueController.createBlague);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
