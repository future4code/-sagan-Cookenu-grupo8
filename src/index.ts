import express, { Request, Response } from "express";
import { AddressInfo } from "net";
import {signup} from './endpoints/signup'
import { UserData } from "./data/userData";
import { HashGenerator } from "./services/hashGenerator";
import { login } from "./endpoints/login";
import { getUserProfile } from "./endpoints/getUserInfo";

const app = express()
app.use(express.json());
const server = app.listen(process.env.PORT || 3003, () => {
    if (server) {
        const address = server.address() as AddressInfo;
        console.log(`Server is running in http://localhost:${address.port}`);
    } else {
        console.error(`Failure upon starting server.`);
    }
});;

app.post('/signup', signup)
app.post('/login', login)
app.get('/user/profile', getUserProfile)
