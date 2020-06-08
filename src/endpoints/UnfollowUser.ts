import { Request, Response } from 'express'
import { BaseDataBase } from '../data/BaseDataBase'
import { TokenGenarator } from '../services/tokenGenerator'
import { UserData } from '../data/userData'

export const UnfollowUser = async (req: Request, res: Response) => {
  try {
    const authorization = req.headers.authorization as string

    const tokenCreator = new TokenGenarator
    const token = tokenCreator.verify(authorization)

    const followUser = new UserData
    const followedId = await followUser.getUserById(req.body.id)

    if(followedId[0]){
      const follow = await followUser.DeleteUserFollow(req.body.id,token.id)

      res.status(200).send({
        follow,
        message: "UnFollowed successfully"
      })
    } else{
      res.status(400).send({
        message:"user do not exist!"
      })
    }
   
  } catch (err) {
    res.status(400).send({
      message: err.message
    })
  }
  finally {
    BaseDataBase.destroyConnection()
  }
}