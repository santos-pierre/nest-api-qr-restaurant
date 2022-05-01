import { Request } from 'express';
export const TOKEN_KEY = 'nest-qr-restaurant';

export const fromCookie = () => {
	return (request: Request) => {
		console.log(request.cookies[TOKEN_KEY]);

		return request.cookies[TOKEN_KEY] ?? null;
	};
};
