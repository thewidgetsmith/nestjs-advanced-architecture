import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';

@Schema()
export class MaterializedAlarmView {
  @Prop({ unique: true, index: true })
  uuid: string;

  @Prop()
  name: string;

  @Prop()
  severity: string;

  @Prop()
  triggeredAt: Date;

  @Prop()
  acknowledgedAt: Date;

  @Prop(raw([{ id: String, name: String, type: { type: String } }]))
  items: Array<{ id: string; name: string; type: string }>;
}

export const MaterializedAlarmViewSchema = SchemaFactory.createForClass(
  MaterializedAlarmView,
);
