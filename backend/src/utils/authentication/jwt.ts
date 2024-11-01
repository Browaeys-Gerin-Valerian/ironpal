import jwt from 'jsonwebtoken';
const { sign, verify } = jwt;


const JWT_SECRET = process.env.JWT_SECRET || 'd3676b0d-2f24-45bf-94fd-30e4697517d0';
const TOKEN_EXPIRATION_TIME = 24 * 60 * 60 * 1000

export const createOrRefreshToken = (userId: number) => {
    return sign({ id: userId }, JWT_SECRET, { expiresIn: TOKEN_EXPIRATION_TIME });
}

export const checkToken = (token: string) => {
    return verify(token, JWT_SECRET);
}