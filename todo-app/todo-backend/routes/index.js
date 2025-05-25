const express = require('express');
const router = express.Router();
const redis = require('../redis')
const configs = require('../util/config')

let visits = 0

/* GET index data. */
router.get('/', async (req, res) => {
  visits++

  res.send({
    ...configs,
    visits
  });
});


/* GET statistics data. */
router.get('/statistics', async (req, res) => {
  const todosCount = await redis.getAsync('added_todos');
  res.json({
    added_todos: todosCount ? parseInt(todosCount) : 0
  });
});

module.exports = router;
