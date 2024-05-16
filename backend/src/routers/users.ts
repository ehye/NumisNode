import express from 'express'
import userService from '../services/userService'

const usersRouter = express.Router()

usersRouter.get('/', async (req, res) => {
  const user = await userService.getUsers()
  if (user) {
    res.json(user)
  } else {
    res.status(404).end()
  }
})

usersRouter.get('/:id', async (req, res) => {
  const user = await userService.getUserById(req.params.id)
  if (user) {
    res.json(user)
  } else {
    res.status(404).end()
  }
})

export default usersRouter
