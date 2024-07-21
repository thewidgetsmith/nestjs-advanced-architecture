import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('alarms')
export class AlarmEntity {
  @PrimaryColumn('uuid')
  uuid: string;

  @Column()
  name: string;

  @Column()
  severity: string;

  constructor(name: string, severity?: string, uuid?: string);
  constructor(name: string, severity: string, uuid?: string);
  constructor(name: string, severity: string, uuid: string);
  constructor(name?: string, severity?: string, uuid?: string) {
    this.severity = severity || 'none';
    this.name = name || '';
    this.uuid = uuid || '';
  }
}
