import { ISendMailOptions } from '@nestjs-modules/mailer';

export interface EmailVerificationOptions extends ISendMailOptions {
	context: EmailVerificationContext;
}

type EmailVerificationContext = {
	name: string;
	email: string;
	url: string;
};
