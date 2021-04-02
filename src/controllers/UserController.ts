import { Request, Response } from 'express'
import User from '../models/User'

export const createUser = function createUser(req: Request, res: Response) {
  try {
    const { device } = req.body
    const user = new User(device)
    return res.json(user)
  } catch (err) {
    return res.status(500).json(err)
  }
}

export const teste = function teste(req: Request, res: Response) {
  try {
    res.sendFile(__dirname + '/index.html')
  } catch (err) {
    return res.status(500).json(err)
  }
}
