import { sign, verify } from 'jsonwebtoken';

const secretKey = process.env.JWT_KEY;

export function getToken(data: any) {
    if (!secretKey) {
        throw new Error("Please provide JWT Key.");
    }
    return sign(data, secretKey);
}

export function getData(token: string) {
    if (!secretKey) {
        throw new Error("Please provide JWT key.")
    }

    try {
        return verify(token, secretKey);
    } catch (error) {
        return null;
    }
}