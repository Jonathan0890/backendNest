import { PartialType } from '@nestjs/mapped-types';
import { CreateMonthlyGoalDto } from './create-monthly_goal.dto';

export class UpdateMonthlyGoalDto extends PartialType(CreateMonthlyGoalDto) {}
