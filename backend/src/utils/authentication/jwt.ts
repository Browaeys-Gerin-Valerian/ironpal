import jwt from 'jsonwebtoken';
const { sign, verify } = jwt;


const JWT_SECRET = process.env.JWT_SECRET as string
//2 Hours token duration
export const TOKEN_EXPIRATION_TIME = 1000 * 60 * 60 * 2




export const createOrRefreshToken = (userId: number) => {
    return sign({ id: userId }, JWT_SECRET, { expiresIn: TOKEN_EXPIRATION_TIME });
}

export const checkToken = (token: string) => {
    return verify(token, JWT_SECRET);
}