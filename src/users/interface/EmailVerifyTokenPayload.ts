import { JwtPayload } from 'jsonwebtoken';

export interface EmailVerifyTokenPayolad extends JwtPayload {
	user_id: string;
	email: string;
}
