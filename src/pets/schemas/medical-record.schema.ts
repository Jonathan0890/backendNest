import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class MedicalRecord extends Document {
    @Prop({ required: true })
    petId: number;

    @Prop()
    diagnosis: string;

    @Prop()
    treatment: string;

    @Prop({ default: Date.now })
    createdAt: Date;
}

export const MedicalRecordSchema = SchemaFactory.createForClass(MedicalRecord);
