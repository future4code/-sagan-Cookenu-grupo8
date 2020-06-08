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

  public async updateRecipe(Recipe_id: string, title?: string, description?: string): Promise<void> {
    if (title && description) {
      await this.getConnection().raw(`
      UPDATE ${RecipeData.TABLE_NAME}
      SET title = "${title}", description ="${description}"
      WHERE Recipe_id = "${Recipe_id}"
      `)
    }
    else if (title) {
      await this.getConnection().raw(`
      UPDATE ${RecipeData.TABLE_NAME}
      SET title = "${title}"
      WHERE Recipe_id = "${Recipe_id}" 
      `)
    }

    else if (description) {
      await this.getConnection().raw(`
      UPDATE ${RecipeData.TABLE_NAME}
      SET description ="${description}"
      WHERE Recipe_id = "${Recipe_id}"
      `)
    }
  }

  public async deleteRecipe(Recipe_id: string): Promise<void> {
    await this.getConnection().delete().from(RecipeData.TABLE_NAME).where({Recipe_id})
  }

}