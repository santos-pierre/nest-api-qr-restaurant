import { DynamicModule, Module } from '@nestjs/common';
import { MailerModuleOptions } from './interfaces/MailerModuleOptions';
import { MailerService } from './mailer.service';

@Module({})
export class MailerModule {
	static forRoot(options: MailerModuleOptions): DynamicModule {
		return {
			module: MailerModule,
			providers: [
				{
					provide: 'MAILER_OPTIONS',
					useValue: options,
				},
				MailerService,
			],
			exports: [MailerService],
		};
	}
}
