const express = require('express');
const router = express.Router();

/**
 * list
 */
router.get('/', function(req, res, next) {
  res.send('main entity list GET');
});
/**
 * new
 */
router.get('/new', function(req, res, next) {
  res.send('main entity new GET');
});
router.post('/new', function(req, res, next) {
  res.send('main entity new POST');
});
/**
 * show
 */
router.get('/:id', function(req, res, next) {
  res.send('main entity show GET');
});
/**
 * edit
 */
router.get('/:id/edit', function(req, res, next) {
  res.send('main entity edit GET');
});
router.post('/:id/edit', function(req, res, next) {
  res.send('main entity edit POST');
});
/**
 * delete
 */
router.post('/:id', function(req, res, next) {
  res.send('main entity delete POST');
});

module.exports = router;