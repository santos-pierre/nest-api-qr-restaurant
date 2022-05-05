import { Injectable } from '@nestjs/common';
import { MailerService as NestMailerService } from '@nestjs-modules/mailer';
import { EmailVerificationOptions } from './interfaces/email-verification-option.interface';

@Injectable()
export class MailerService {
	constructor(private readonly mailerService: NestMailerService) {}

	async sendEmailVerification(options: EmailVerificationOptions): Promise<boolean> {
		try {
			await this.mailerService.sendMail({
				to: options.to,
				template: options.template ?? 'email-verification',
				context: options.context,
			});
			return true;
		} catch (error) {
			return false;
		}
	}
}
