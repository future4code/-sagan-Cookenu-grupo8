import knex from 'knex'
import { BaseDataBase } from './BaseDataBase';

export class UserData extends BaseDataBase{
    public static Table_Name = 'UsersCookenu'

    public async createUser(name:string, email:string, password:string, id:string):Promise<void>{
        await this.getConnection().insert({
            name, email, password, id
        }).into(UserData.Table_Name)
    }

    public async getUserByEmail(email:string){
        const userData = await this.getConnection().select('*').from(UserData.Table_Name).where({
            email
        })
        return userData
    }
}