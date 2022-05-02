import { Inject, Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { MailerModuleOptions } from './interfaces/MailerModuleOptions';

@Injectable()
export class MailerService {
	private readonly from: string;
	private transporter: nodemailer.Transporter;
	constructor(@Inject('MAILER_OPTIONS') private options: MailerModuleOptions) {
		this.from = options.from;
		this.transporter = nodemailer.createTransport({
			host: options.host ?? 'localhost',
			port: options.port,
		});
	}

	async sendMail(options: nodemailer.SendMailOptions): Promise<boolean> {
		const messageStatus = await this.transporter.sendMail({
			...options,
			from: options.from ?? this.from,
		});

		if (!messageStatus) {
			return false;
		}

		return true;
	}
}
