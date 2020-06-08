import knex from 'knex'
import { BaseDataBase } from './BaseDataBase';

export class UserData extends BaseDataBase{
    public static Table_Name = 'UsersCookenu'

    public async createUser(name:string, email:string, password:string, id:string, role:string):Promise<void>{
        await this.getConnection().insert({
            name, email, password, id, role
        }).into(UserData.Table_Name)
    }

    public async getUserByEmail(email:string){
        const userData = await this.getConnection().select('*').from(UserData.Table_Name).where({
            email
        })
        return userData
    }

    public async getUserById(id:string){
        const userData = await this.getConnection().select('*').from(UserData.Table_Name).where({
            id
        })
        return userData
    }

    public async userFollow(Followed_id:string, Follower_id: string):Promise<void>{
        const followData = await this.getConnection().insert({
            Followed_id, Follower_id
        }).into("AuxTableUser")
    }
    public async DeleteUserFollow(Followed_id?:string, Follower_id?: string):Promise<void>{
        const deleteFollow = await this.getConnection().delete().from("AuxTableUser").where({
            Followed_id, Follower_id
        })
    }
}