import express, { Request, Response } from "express";
import { IdGenerator } from "../services/idGenerator";
import { TokenGenarator } from "../services/tokenGenerator";
import { HashGenerator } from "../services/hashGenerator";
import { UserData } from "../data/userData";
import { BaseDataBase } from "../data/BaseDataBase";

export const getUserProfile = async (req: Request, res: Response): Promise<any> => {
    try {
        const authorization = req.headers.authorization as string

        const tokenCreator = new TokenGenarator()
        const token = tokenCreator.verify(authorization)

        const userCreator = new UserData()
        const user = await userCreator.getUserById(token.id)

        res.status(200).send({
            id: user[0].id,
            name: user[0].name,
            email: user[0].email
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