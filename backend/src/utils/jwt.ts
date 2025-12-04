import jwt from 'jsonwebtoken';
import { JWT_SECRET, JWT_REFRESH_SECRET } from '../config/env';
import { Response } from 'express';

export const generateTokens = (res: Response, userId: string) => {
    const accessToken = jwt.sign({ userId }, JWT_SECRET, {
        expiresIn: '15m',
    });

    const refreshToken = jwt.sign({ userId }, JWT_REFRESH_SECRET, {
        expiresIn: '30d',
    });

    res.cookie('jwt', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    return accessToken;
};
