import { Request, Response } from 'express'
import { BaseDataBase } from '../data/BaseDataBase'
import { IdGenerator } from '../services/idGenerator'
import { TokenGenarator } from '../services/tokenGenerator'
import { RecipeData } from '../data/RecipeData'

export const CreateRecipe = async (req: Request, res: Response) => {
  try {
    const authorization = req.headers.authorization as string

    const idCreator = new IdGenerator
    const id = idCreator.generator();

    const tokenCreator = new TokenGenarator
    const token = tokenCreator.verify(authorization)

    const recipeCreator = new RecipeData
    const recipe = await recipeCreator.createRecipe(id, token.id, req.body.title, 
    req.body.description)

    res.status(200).send({
      recipe,
      message: "Recipe created succefully!"
    })

  } catch (err) {
    res.status(400).send({
      message: err.message
    })
  }
  finally {
    BaseDataBase.destroyConnection()
  }
}