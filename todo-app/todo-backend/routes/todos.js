const express = require('express');
const { Todo } = require('../mongo')
const router = express.Router();
const redis = require('../redis')

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

router.get('/:id', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).end();
    res.json(todo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error getting To-Do' });
  }
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })

  //Increase Redis counter
  let todosCount = await redis.getAsync('added_todos');
  todosCount = todosCount ? parseInt(todosCount) + 1 : 1;
  await redis.setAsync('added_todos', todosCount);

  
  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()  
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  res.sendStatus(405); // Implement this
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  res.sendStatus(405); // Implement this
});

router.put('/:id', async (req, res) => {
  try {
    const body = req.body;
    
    const todo = {
      text: body.text,
      done: body.done
    };
    
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id, 
      todo, 
      { new: true, runValidators: true }
    );
    
    if (!updatedTodo) return res.status(404).end();
    
    res.json(updatedTodo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error updating To-Do' });
  }
});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
