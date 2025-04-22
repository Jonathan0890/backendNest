export class CreateReminderDto {
    title: string;
    description: string;
    due_date: Date;
    is_recurring: boolean;
}
