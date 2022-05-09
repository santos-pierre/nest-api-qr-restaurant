import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Allergen } from 'src/dishes/entities/allergens.entity';
import { AllergensController } from './allergens.controller';
import { AllergensService } from './allergens.service';

@Module({
	imports: [TypeOrmModule.forFeature([Allergen])],
	controllers: [AllergensController],
	providers: [AllergensService],
})
export class AllergenModule {}
