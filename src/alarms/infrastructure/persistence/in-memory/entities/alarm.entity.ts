import { AlarmItemEntity } from './alarm-item.entity';

export class AlarmEntity {
  uuid: string;
  name: string;
  severity: string;
  triggeredAt: Date;
  acknowledgedAt: Date;
  items: Array<AlarmItemEntity>;
}
