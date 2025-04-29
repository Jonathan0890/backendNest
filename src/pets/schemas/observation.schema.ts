import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Observation extends Document {
    @Prop({ required: true })
    petId: number;

    @Prop()
    notes: string;

    @Prop({ default: Date.now })
    recordedAt: Date;
}

export const ObservationSchema = SchemaFactory.createForClass(Observation);
