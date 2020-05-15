import { Request, Response } from "express";
import { TokenGenarator } from "../services/tokenGenerator";
import { BaseDataBase } from "../data/BaseDataBase";
import { RecipeData } from "../data/RecipeData";

export const getRecipeById = async (req: Request, res: Response): Promise<any> => {
    try {
        const authorization = req.headers.authorization as string

        const tokenCreator = new TokenGenarator()
        const token = tokenCreator.verify(authorization)

        const recipeData = new RecipeData
        const getRecipe = await recipeData.getRecipeById(req.params.id)

        res.status(200).send({
          id: getRecipe[0].id,
          title: getRecipe[0].title,
          description: getRecipe[0].description,
          date: getRecipe[0].date
        })
    }
    catch (err) {
        res.status(400).send({
            message: err.message
        })
    }
    finally {
        BaseDataBase.destroyConnection()
    }

}