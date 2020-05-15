import { Request, Response } from 'express'
import { BaseDataBase } from '../data/BaseDataBase'
import { TokenGenarator } from '../services/tokenGenerator'
import { RecipeData } from '../data/RecipeData'

export const updateRecipe = async (req: Request, res: Response) => {
  try {
    const authorization = req.headers.authorization as string

    const tokenCreator = new TokenGenarator
    const token = tokenCreator.verify(authorization)

    const update = {
        title: req.body.title,
        description: req.body.description
    }

    const recipeCreator = new RecipeData
    const recipe = await recipeCreator.updateRecipe(req.body.id, update)

    res.status(200).send({
      message: "Recipe updated succefully!"
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