import express, { Request, Response } from "express";
import { AddressInfo } from "net";
import {signup} from './endpoints/signup'
import { login } from "./endpoints/login";
import { getUserProfile } from "./endpoints/getUserInfo";
import { getAnotherUserProfile } from "./endpoints/getAnotherUserProfile";
import { CreateRecipe } from "./endpoints/CreateRecipe";
import { getRecipeById } from "./endpoints/getRecipeById";
import { UserFollow } from "./endpoints/UserFollow";
import { UnfollowUser } from "./endpoints/UnfollowUser";
import { getAllRecipes } from "./endpoints/getAllRecipes";
import { updateRecipe } from "./endpoints/UpdateRecipe";
import { DeleteRecipe } from "./endpoints/DeleteRecipe";



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
app.post("/recipe", CreateRecipe)
app.get("/recipe/:id", getRecipeById)
app.post("/user/follow", UserFollow)
app.post("/user/unfollow", UnfollowUser)
app.get("/user/feed", getAllRecipes)
app.get('/user/:id', getAnotherUserProfile)
app.post("/recipe/update/:id", updateRecipe)
app.delete("/recipe/delete/:id", DeleteRecipe)
