import express, { Request, Response } from "express";
import { IdGenerator } from "../services/idGenerator";
import { TokenGenarator } from "../services/tokenGenerator";
import { HashGenerator } from "../services/hashGenerator";
import { UserData } from "../data/userData";
import { BaseDataBase } from "../data/BaseDataBase";

export const login = async (req:Request, res:Response)=>{
    const userCreator = new UserData()
    const user = await userCreator.getUserByEmail(req.body.email)

    const hashCreator = new HashGenerator
    const hash = await hashCreator.compareHash(req.body.password, user.password)
}