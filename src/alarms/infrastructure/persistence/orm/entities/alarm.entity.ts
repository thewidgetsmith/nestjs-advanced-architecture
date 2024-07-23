import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { AlarmItemEntity } from './alarm-item.entity';

@Entity('alarms')
export class AlarmEntity {
  @PrimaryColumn('uuid')
  uuid: string;

  @Column()
  name: string;

  @Column()
  severity: string;

  @Column()
  triggeredAt: Date;

  @Column()
  acknowledgedAt: Date;

  @OneToMany(() => AlarmItemEntity, (event) => event.alarm, {cascade: true})
  items: AlarmItemEntity[];

  constructor(name: string, severity?: string, uuid?: string);
  constructor(name: string, severity: string, uuid?: string);
  constructor(name: string, severity: string, uuid: string);
  constructor(name?: string, severity?: string, uuid?: string) {
    this.severity = severity || 'none';
    this.name = name || '';
    this.uuid = uuid || '';
  }
}
