import express, { Request, Response } from "express";
import { IdGenerator } from "../services/idGenerator";
import { TokenGenarator } from "../services/tokenGenerator";
import { HashGenerator } from "../services/hashGenerator";
import { UserData } from "../data/userData";
import { BaseDataBase } from "../data/BaseDataBase";

export const login = async (req: Request, res: Response): Promise<any> => {
    try {
        const userCreator = new UserData()
        const user = await userCreator.getUserByEmail(req.body.email)

        if (user[0]) {
            const hashCreator = new HashGenerator
            const hash = await hashCreator.compareHash(req.body.password, user[0].password)
            
            if (hash) {
                const tokenCreator = new TokenGenarator()
                const newToken = tokenCreator.token({
                    id: user[0].id,
                    role: user[0].role
                })
                res.status(200).send({
                    token: newToken
                })
            }
            else {
                throw new Error('Informações inválidas')
            }
        }
        else {
            throw new Error('Informações inválidas')
        }
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