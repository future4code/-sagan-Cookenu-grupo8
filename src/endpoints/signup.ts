import express, { Request, Response } from "express";
import { IdGenerator } from "../services/idGenerator";
import { TokenGenarator } from "../services/tokenGenerator";
import { HashGenerator } from "../services/hashGenerator";
import { UserData } from "../data/userData";
import { BaseDataBase } from "../data/BaseDataBase";

export const signup = async (req: Request, res: Response): Promise<any> => {
    try {
        if (req.body.name && req.body.email && req.body.password) {
            const idCreator = new IdGenerator()
            const newId = idCreator.generator()

            const hashCreator = new HashGenerator()
            const newHash = await hashCreator.hash(req.body.password)

            const userCreator = new UserData()
            const newUser = await userCreator.createUser(req.body.name, req.body.email, 
            newHash, newId,req.body.role)

            const tokenCreator = new TokenGenarator()
            const newToken = tokenCreator.token({
                id: newId,
                role: req.body.role
            })

            res.status(200).send({
                token: newToken
            })
        }
        else {
            throw new Error('Por favor preencha todos os campos para prosseguir')

        }
    }
    catch (err) {
        res.status(400).send({
            message: err.message
        })
    }
    finally{
        BaseDataBase.destroyConnection()
    }
}

