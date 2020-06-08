import * as jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();

export class TokenGenarator{
    private static expiresIn: number = 120
    
    public token = (input: AuthenticationData):string => {
        const newToken = jwt.sign(
            {
                id: input.id,
                role: input.role
            },
            process.env.JWT_KEY as string,
            {
            expiresIn: TokenGenarator.expiresIn
            }
            )
        return newToken
    }
    
    public verify(token:string){
        const payload = jwt.verify(token, process.env.JWT_KEY as string) as any
        const result = { id: payload.id, role: payload.role}
        return result
        
    }
}

export interface AuthenticationData {
    id: string,
    role: string
} 

process.env.JWT_KEY as string