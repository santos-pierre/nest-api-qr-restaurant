import { Request } from 'express';
export const TOKEN_KEY = 'nest-qr-restaurant';

export const fromCookie = () => {
	return (request: Request) => {
		return request.cookies[TOKEN_KEY] ?? null;
	};
};
