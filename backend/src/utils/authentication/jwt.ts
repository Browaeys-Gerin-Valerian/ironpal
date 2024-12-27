import jwt from 'jsonwebtoken';
const { sign, verify } = jwt;
import { config } from "../../config/config"
const { jwt_secret } = config

//2 Hours token duration
export const TOKEN_EXPIRATION_TIME = 1000 * 60 * 60 * 2

export const createOrRefreshToken = (userId: number) => {
    return sign({ id: userId }, jwt_secret, { expiresIn: TOKEN_EXPIRATION_TIME });
}

export const checkToken = (token: string) => {
    return verify(token, jwt_secret);
}