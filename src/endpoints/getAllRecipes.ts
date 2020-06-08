import { Request, Response } from "express";
import { TokenGenarator } from "../services/tokenGenerator";
import { BaseDataBase } from "../data/BaseDataBase";
import { RecipeData } from "../data/RecipeData";

export const getAllRecipes = async (req: Request, res: Response): Promise<any> => {
    try {
        const authorization = req.headers.authorization as string

        const tokenCreator = new TokenGenarator()
        const token = tokenCreator.verify(authorization)

        const recipeData = new RecipeData
        const getRecipe = await recipeData.getAllRecipes()

        res.status(200).send({
          getRecipe
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