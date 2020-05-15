import knex from 'knex'
import { BaseDataBase } from './BaseDataBase';

export class RecipeData extends BaseDataBase {
  private static TABLE_NAME: string = "RecipesCookenu"

  public async createRecipe(Recipe_id: string, user_id: string, title: string, description: string): Promise<void> {
    await this.getConnection().raw(`
  INSERT INTO RecipesCookenu(Recipe_id, user_id, title, description, date)
  VALUES(
  '${Recipe_id}',
  '${user_id}',
  '${title}',
  '${description}',
  curdate()
  );
  `);
  }

  public async getRecipeById(id: string): Promise<any> {
    const result = await this.getConnection().select("*").from(RecipeData.TABLE_NAME).where({ Recipe_id: id })
    return result
  }

  public async getAllRecipes(): Promise<any> {
    const getRecipesList = await this.getConnection().select("*").from(RecipeData.TABLE_NAME)
    return getRecipesList
  }

  public async updateRecipe(id: string, changes?: object): Promise<void> {
    const connection = this.getConnection()
    await connection(RecipeData.TABLE_NAME).where({id}).update(changes!)
  }

}