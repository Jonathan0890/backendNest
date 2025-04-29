import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Reminder extends Document {
    @Prop({ required: true })
    userId: string; // Referencia al usuario en MongoDB

    @Prop({ required: true, maxlength: 255 })
    title: string;

    @Prop({ type: String })
    description: string;

    @Prop({ type: Date })
    due_date: Date;

    @Prop({ default: false })
    is_recurring: boolean;
}

export const ReminderSchema = SchemaFactory.createForClass(Reminder);
