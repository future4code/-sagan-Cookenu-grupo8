import { Request, Response } from 'express'
import { BaseDataBase } from '../data/BaseDataBase'
import { TokenGenarator } from '../services/tokenGenerator'
import { RecipeData } from '../data/RecipeData'

export const updateRecipe = async (req: Request, res: Response) => {
  try {
    const authorization = req.headers.authorization as string

    const tokenCreator = new TokenGenarator
    const token = tokenCreator.verify(authorization)

    const recipeCreator = new RecipeData
    const recipeId = await recipeCreator.getRecipeById(req.params.id)

    if(recipeId[0].user_id === token.id ){
      const recipe = await recipeCreator.updateRecipe(req.params.id,req.body.title, req.body.description)
  
      res.status(200).send({
        recipe,
        message: "Recipe updated succefully!"
      })
    } else{
      throw new Error("Voce não pode alterar uma receita de outro usuário!")
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